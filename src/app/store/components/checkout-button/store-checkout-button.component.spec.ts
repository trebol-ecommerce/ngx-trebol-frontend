/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import { StoreCheckoutService } from 'src/app/store/store-checkout.service';
import { StoreCartService } from '../../store-cart.service';
import { StoreCheckoutButtonComponent } from './store-checkout-button.component';

describe('StoreCheckoutButtonComponent', () => {
  let component: StoreCheckoutButtonComponent;
  let fixture: ComponentFixture<StoreCheckoutButtonComponent>;
  let mockCartService: Partial<StoreCartService>;
  let mockCheckoutService: Partial<StoreCheckoutService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
      cartDetails$: of([
        { id: null, product: { barcode: 'test' }, units: 1 }
      ]),
    };
    mockCheckoutService = {
      requestPayment() { return throwError({}); }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreCheckoutButtonComponent ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService },
        { provide: mockCheckoutService, useValue: mockCheckoutService },
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
