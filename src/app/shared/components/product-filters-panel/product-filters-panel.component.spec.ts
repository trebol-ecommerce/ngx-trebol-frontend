/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { count, take, tap } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { ProductSearchQuery } from 'src/models/ProductSearchQuery';
import { ProductFiltersPanelComponent } from './product-filters-panel.component';

@Component({
  selector: 'app-product-category-selector-field',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockCategorySelectorFormFieldComponent }]
})
class MockCategorySelectorFormFieldComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { };
  ontouched = () => { };
  writeValue() { }
  registerOnChange(fn: (v: any) => any) { this.onchange = fn; }
  registerOnTouched(fn: () => any) { this.ontouched = fn; }
}

describe('ProductFiltersPanelComponent', () => {
  let component: ProductFiltersPanelComponent;
  let fixture: ComponentFixture<ProductFiltersPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [
        MockCategorySelectorFormFieldComponent,
        ProductFiltersPanelComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFiltersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire the `filtersChanges` event when any input value changes', () => {
    jasmine.clock().install();
    let cooldownInterval = component.formChangesDebouncingTimeMs;
    let expectedEmissions = 3;
    component.filtersChanges.pipe(
      take(expectedEmissions),
      count(),
      tap(c => expect(c).toBe(expectedEmissions))
    ).subscribe();
    component.categoryCode.setValue('some-code');
    jasmine.clock().tick(cooldownInterval);
    component.nameLike.setValue('some-name');
    jasmine.clock().tick(cooldownInterval);
    component.categoryCode.setValue(null);
    jasmine.clock().tick(cooldownInterval);
    jasmine.clock().uninstall();
  });

  it('should accept instances of ProductSearchQuery as valid input', () => {
    const filters: ProductSearchQuery = {
      nameLike: 'some-na',
      categoryCode: 'some-code'
    };
    component.formGroup.setValue(filters);
    expect(component.formGroup.value).toEqual(filters);
  });


  describe('when a category is selected', () => {
    let fakeCategory: ProductCategory;
    beforeEach(() => {
      fakeCategory = {
        code: 'some-code',
        name: 'some-name'
      };
    });

    it('should change the value of the corresponding form control', () => {
      component.onSelectCategory(fakeCategory);
      expect(component.categoryCode.value).toEqual(fakeCategory.code);
    });

    it('should fire the `filtersChanges` event', () => {
      jasmine.clock().install();
      component.filtersChanges.pipe(
        take(1),
        tap(f => expect(f.categoryCode).toBe(fakeCategory.code))
      ).subscribe();
      component.onSelectCategory(fakeCategory);
      jasmine.clock().tick(component.formChangesDebouncingTimeMs);
      jasmine.clock().uninstall();
    });
  });
});
