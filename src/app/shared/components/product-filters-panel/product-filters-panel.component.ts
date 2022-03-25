/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
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

  get category() { return this.formGroup.get('category') as FormControl; }
  get nameLike() { return this.formGroup.get('nameLike') as FormControl; }

  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      category: [null],
      nameLike: ['']
    });

    this.valueChangesSubscription = this.formGroup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(value => {
        const filters: Partial<ProductFilters> = {};
        if (value.nameLike) {
          filters.nameLike = value.nameLike;
        }
        if (value.category) {
          filters.categoryCode = value.category.code;
        } else if (value.category === null) {
          filters.categoryCode = null;
        }
        this.filtersChanges.emit(filters as ProductFilters);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }

}
