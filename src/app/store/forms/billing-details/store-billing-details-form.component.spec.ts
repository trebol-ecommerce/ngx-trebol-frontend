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
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreBillingDetailsFormComponent } from './store-billing-details-form.component';

class MockAbstractFormComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
}

@Component({
  selector: 'app-company-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockCompanyFormComponent }]
})
class MockCompanyFormComponent
  extends MockAbstractFormComponent { }

@Component({
  selector: 'app-address-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressFormComponent }]
})
class MockAddressFormComponent
  extends MockAbstractFormComponent { }

describe('StoreBillingDetailsFormComponent', () => {
  let component: StoreBillingDetailsFormComponent;
  let fixture: ComponentFixture<StoreBillingDetailsFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatRadioModule
      ],
      declarations: [
        MockCompanyFormComponent,
        MockAddressFormComponent,
        StoreBillingDetailsFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBillingDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept ')
});
