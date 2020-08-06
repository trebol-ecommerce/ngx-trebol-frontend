import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductFamily } from 'src/data/models/entities/ProductFamily';
import { ProductType } from 'src/data/models/entities/ProductType';
import { DATA_INJECTION_TOKENS } from 'src/data/services/data-injection-tokens';
import { SharedDataIService } from 'src/data/services/shared.data.iservice';

//TODO refactor all data service interactions into a separate service

export interface ProductFilters {
  name?: string;
  typeId?: number;
  familyId?: number;
}

@Component({
  selector: 'app-product-filters-panel',
  templateUrl: './product-filters-panel.component.html',
  styleUrls: [ './product-filters-panel.component.css' ]
})
export class ProductFiltersPanelComponent
  implements OnInit, OnDestroy {

  protected familyChangeSub: Subscription;
  protected typeChangeSub: Subscription;
  protected nameChangeSub: Subscription;

  @Output() public filtersChanges: EventEmitter<ProductFilters> = new EventEmitter();

  public formGroup: FormGroup;
  public families$: Observable<ProductFamily[]>;
  public types$: Observable<ProductType[]>;

  constructor(
    @Inject(DATA_INJECTION_TOKENS.shared) protected sharedDataService: SharedDataIService,
    protected formBuilder: FormBuilder
  ) {

    this.formGroup = this.formBuilder.group({
      productFamily: [null],
      productType: [{value: null, disabled: true}],
      productName: ['']
    });
  }

  public get productFamily() { return this.formGroup.get('productFamily'); }
  public get productType() { return this.formGroup.get('productType'); }
  public get productName() { return this.formGroup.get('productName'); }

  ngOnInit(): void {
    this.families$ = this.sharedDataService.readAllProductFamilies();

    this.familyChangeSub = this.productFamily.valueChanges.subscribe(() => { this.onChangeProductFamily(); });
    this.typeChangeSub = this.productType.valueChanges.subscribe(() => { this.emitFiltersChange(); });
    this.nameChangeSub = this.productName.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => { this.emitFiltersChange(); });
  }

  ngOnDestroy(): void {
    if (this.familyChangeSub) { this.familyChangeSub.unsubscribe(); }
    if (this.typeChangeSub) { this.typeChangeSub.unsubscribe(); }
    if (this.nameChangeSub) { this.typeChangeSub.unsubscribe(); }
  }

  protected resetProductType(): void {
    this.types$ = of([]);
    this.productType.reset();
    this.productType.disable();
  }

  protected emitFiltersChange(): void {
    this.formGroup.updateValueAndValidity();
    const filters: ProductFilters = {};

    if (this.productName.value) {
      filters.name = this.productName.value;
    }
    if (this.productType.value) {
      filters.typeId = this.productType.value;
    }
    if (this.productFamily.value) {
      filters.familyId = this.productFamily.value;
    }

    this.filtersChanges.emit(filters);
  }

  protected onChangeProductFamily(): void {
    const selectedProductTypeId: number = this.productType.value;
    if (this.productFamily.value) {
      if (this.productType.enabled) { this.productType.disable(); }

      const familyId: number = Number(this.productFamily.value);
      if (!isNaN(familyId)) {
        this.emitFiltersChange();
        this.sharedDataService.readAllProductTypesByFamilyId(familyId).subscribe(
          (types: ProductType[]) => {
            if (types && types.length > 0) {
              this.types$ = of(types);
              this.productType.enable();
              if (selectedProductTypeId && !types.some(tp => tp.id === selectedProductTypeId)) {
                this.productType.reset();
              }
            } else {
              this.resetProductType();
            }
          },
          err => {
            this.productType.reset();
            this.productType.disable();
          }
        );
        return;
      }
    }

    this.resetProductType();
  }

  public onClickResetProductFamily(event: any): void {
    this.productFamily.reset();
    event.stopPropagation();
  }

  public onClickResetProductType(event: any): void {
    this.productType.reset();
    event.stopPropagation();
  }

}
