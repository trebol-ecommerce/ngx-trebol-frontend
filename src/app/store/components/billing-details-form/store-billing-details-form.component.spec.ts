/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { StoreService } from '../../store.service';
import { StoreBillingDetailsFormComponent } from './store-billing-details-form.component';

@Component({
  selector: 'app-company-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockCompanyFormComponent }]
})
class MockCompanyFormComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
}

@Component({
  selector: 'app-addresses-editor-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockAddressesEditorFormComponent }]
})
class MockAddressesEditorFormComponent
implements ControlValueAccessor  {
  @Input() placeholder: string;
  @Input() editLabel: string;
  @Input() addLabel: string;
  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}

describe('StoreBillingDetailsFormComponent', () => {
  let component: StoreBillingDetailsFormComponent;
  let fixture: ComponentFixture<StoreBillingDetailsFormComponent>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      checkoutButtonPress: new EventEmitter()
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatRadioModule,
      ],
      declarations: [
        StoreBillingDetailsFormComponent,
        MockCompanyFormComponent,
        MockAddressesEditorFormComponent
      ],
      providers: [
        { provide: StoreService, useValue: mockStoreService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBillingDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
