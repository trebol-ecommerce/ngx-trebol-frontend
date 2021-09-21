/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { StoreCartService } from 'src/app/store/routes/cart/store-cart.service';
import { StoreCheckoutButtonComponent } from './store-checkout-button.component';

describe('StoreCheckoutButtonComponent', () => {
  let component: StoreCheckoutButtonComponent;
  let fixture: ComponentFixture<StoreCheckoutButtonComponent>;
  let mockCartService: Partial<StoreCartService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
      cartDetails$: of([
        { id: null, product: { barcode: 'test' }, units: 1 }
      ]),
      requestPayment() { return throwError({}); }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      declarations: [ StoreCheckoutButtonComponent ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
