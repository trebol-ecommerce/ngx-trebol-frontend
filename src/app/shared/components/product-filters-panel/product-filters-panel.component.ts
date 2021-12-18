/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductFiltersPanelService } from './product-filters-panel.service';
import { ProductFilters } from './ProductFilters';

@Component({
  selector: 'app-product-filters-panel',
  templateUrl: './product-filters-panel.component.html',
  styleUrls: [ './product-filters-panel.component.css' ]
})
export class ProductFiltersPanelComponent
  implements OnDestroy {

  private valueChangesSubscription: Subscription;

  @Output() filtersChanges = new EventEmitter<ProductFilters>();

  formGroup: FormGroup;
  categories$: Observable<ProductCategory[]>;

  get category() { return this.formGroup.get('category'); }
  get name() { return this.formGroup.get('name'); }

  constructor(
    protected service: ProductFiltersPanelService,
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      category: [null],
      name: ['']
    });

    this.valueChangesSubscription = this.formGroup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((value: ProductFilters) => { this.filtersChanges.emit(value); })
    ).subscribe();

    this.categories$ = this.service.getRootProductCategories();
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  onClickResetProductCategory(event: any): void {
    this.category.reset();
  }

}
