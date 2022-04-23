/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ProductCategoryPickerDialogComponent } from 'src/app/shared/dialogs/product-category-picker/product-category-picker-dialog.component';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductSearchQuery } from 'src/models/ProductSearchQuery';
import { StoreSearchService } from '../../../store-search.service';

@Component({
  selector: 'app-store-header-search-form',
  templateUrl: './store-header-search-form.component.html',
  styleUrls: ['./store-header-search-form.component.css']
})
export class StoreHeaderSearchFormComponent
  implements OnInit, OnDestroy {

  private categoryPickerSubscription: Subscription;
  private productSearchChanges: Subscription;
  private queryParamsSub: Subscription;

  readonly searchFiltersDebounceMs = 400;

  formGroup: FormGroup;
  get nameLike() { return this.formGroup.get('nameLike') as FormControl; }
  get categoryCode() { return this.formGroup.get('categoryCode') as FormControl; }

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: MatDialog,
    private searchService: StoreSearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nameLike: [''],
      categoryCode: [null]
    });
    this.productSearchChanges = this.formGroup.valueChanges.pipe(
      debounceTime(this.searchFiltersDebounceMs),
      tap(() => { this.searchService.pageIndex = 0; }),
      switchMap(value => from(this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: value,
          queryParamsHandling: 'merge'
        }
      )))
    ).subscribe();
    this.queryParamsSub = this.route.queryParams.pipe(
      tap(params => this.searchService.updateSearchQuery(params)),
      switchMap(() => this.searchService.reload())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.productSearchChanges.unsubscribe();
    this.queryParamsSub.unsubscribe();
    this.categoryPickerSubscription?.unsubscribe();
  }

  onTouched(): void {
    if (this.route.firstChild.routeConfig.path !== 'search') {
      this.router.navigateByUrl('/store/search');
    }
  }

  onClickOpenCategoryPicker(): void {
    this.categoryPickerSubscription?.unsubscribe();
    this.categoryPickerSubscription = this.dialogService.open(
      ProductCategoryPickerDialogComponent,
      {
        width: '24rem'
      }
    ).afterClosed().pipe(
      tap((next: ProductCategory | null) => {
        if (next?.code) {
          this.categoryCode.setValue(next.code);
          this.categoryCode.markAsDirty();
        } else if (next === null) {
          this.categoryCode.reset(null);
        }
      })
    ).subscribe();
  }

  onClickResetForm(): void {
    this.formGroup.reset({
      nameLike: '',
      categoryCode: null
    });
  }

}
