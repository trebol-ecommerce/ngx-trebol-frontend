/*
 * Copyright (c) 2021 The Trébol eCommerce Project
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
  get name() { return this.formGroup.get('name') as FormControl; }

  constructor(
    protected formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      category: [null],
      name: ['']
    });

    this.valueChangesSubscription = this.formGroup.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(value => this.filtersChanges.emit(
        {
          name: value.name || undefined,
          categoryCode: value.category?.code || undefined
        }
      ))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription?.unsubscribe();
  }

}
