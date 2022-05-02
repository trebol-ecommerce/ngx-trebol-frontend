/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreCheckoutButtonComponent } from './store-checkout-button.component';

describe('StoreCheckoutButtonComponent', () => {
  let component: StoreCheckoutButtonComponent;
  let fixture: ComponentFixture<StoreCheckoutButtonComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreCheckoutButtonComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remain disabled when just created', () => {
    expect(component.disabled).toBeTrue();
  });

  it('should accept values in its [checkoutDetails] binding', () => {
    const payload = {
      token: 'some-token',
      url: 'some-url'
    };
    component.checkoutDetails = payload;
    expect(component.checkoutDetails).toEqual(payload);
  });

  it('should remain enabled after accepting a value in its [checkoutDetails] binding', () => {
    component.checkoutDetails = {
      token: 'some-token',
      url: 'some-url'
    };
    expect(component.disabled).toBeFalse();
  });

  it('should render a form with a single token control and a submit button', () => {
    const formElem = fixture.debugElement.nativeElement.querySelector('form') as HTMLFormElement;
    expect(formElem).toBeTruthy();
    const inputElem = formElem.querySelector(`input[name=${component.innerControlName}]`) as HTMLInputElement;
    expect(inputElem).toBeTruthy();
    const submitButtonElem = formElem.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitButtonElem).toBeTruthy();
  });
});
