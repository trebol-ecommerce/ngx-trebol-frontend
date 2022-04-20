/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductFilters } from './ProductFilters';

@Component({
  selector: 'app-product-filters-panel',
  templateUrl: './product-filters-panel.component.html',
  styleUrls: [ './product-filters-panel.component.css' ]
})
export class ProductFiltersPanelComponent
  implements OnInit, OnDestroy {

  private valueChangesSubscription: Subscription;

  @Output() filtersChanges = new EventEmitter<ProductFilters>();

  formGroup: FormGroup;
  get categoryCode() { return this.formGroup.get('categoryCode') as FormControl; }
  get nameLike() { return this.formGroup.get('nameLike') as FormControl; }

  readonly formChangesDebouncingTimeMs = 300;

  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      categoryCode: [null],
      nameLike: ['']
    });
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.formGroup.valueChanges.pipe(
      debounceTime(this.formChangesDebouncingTimeMs),
      distinctUntilChanged((prev, curr) => (
        JSON.stringify(prev) === JSON.stringify(curr)
      )),
      tap(value => {
        const filters: Partial<ProductFilters> = {};
        if (value.nameLike) {
          filters.nameLike = value.nameLike;
        }
        if (value.categoryCode) {
          filters.categoryCode = value.categoryCode;
        }
        this.filtersChanges.emit(filters as ProductFilters);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }

  onSelectCategory(category: ProductCategory) {
    this.categoryCode.setValue(category.code);
  }

}
