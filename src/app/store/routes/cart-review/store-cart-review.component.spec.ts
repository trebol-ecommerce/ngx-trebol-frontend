/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OrderDetail } from 'src/models/entities/OrderDetail';
import { StoreCartService } from '../../store-cart.service';
import { StoreCartReviewComponent } from './store-cart-review.component';

@Component({ selector: 'app-order-details-table' })
class MockStoreCartContenstTableComponent {
  @Input() orderDetails: OrderDetail[];
  @Input() editable: boolean;
  @Output() increaseUnitsAtIndex = new EventEmitter<number>();
  @Output() decreaseUnitsAtIndex = new EventEmitter<number>();
  @Output() removeAtIndex = new EventEmitter<number>();
}

@Component({ selector: 'app-store-checkout-request-form' })
class MockStoreCheckoutRequestFormComponent {
  @Output() request = new EventEmitter();
}

@Component({ selector: 'app-store-checkout-confirmation' })
class MockStoreCheckoutConfirmationComponent {
  @Output() confirmed = new EventEmitter();
}

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let cartServiceSpy: jasmine.SpyObj<StoreCartService>;

  beforeEach(waitForAsync(() => {
    const mockCartService = jasmine.createSpyObj('StoreCartService', ['increaseProductUnits', 'decreaseProductUnits', 'removeProductFromCart']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'store', component: StoreCartReviewComponent }
        ]),
        MatButtonModule,
        MatDialogModule,
        MatDividerModule,
        MatIconModule,
        MatTableModule,
        MatStepperModule
      ],
      declarations: [
        StoreCartReviewComponent,
        MockStoreCartContenstTableComponent,
        MockStoreCheckoutRequestFormComponent,
        MockStoreCheckoutConfirmationComponent
      ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    cartServiceSpy = TestBed.inject(StoreCartService) as jasmine.SpyObj<StoreCartService>;
    cartServiceSpy.cartDetails$ = of([]);
    cartServiceSpy.cartNetValue$ = of(0);

    fixture = TestBed.createComponent(StoreCartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add units of a product to the cart', () => {
    component.onIncreaseProductQuantityAtIndex(0);
    expect(cartServiceSpy.increaseProductUnits).toHaveBeenCalled();
  });

  it('should remove units of a product from the cart', () => {
    component.onDecreaseProductQuantityAtIndex(0);
    expect(cartServiceSpy.decreaseProductUnits).toHaveBeenCalled();
  });

  it('should remove all units of a product from the cart', () => {
    component.onRemoveProductAtIndex(0);
    expect(cartServiceSpy.removeProductFromCart).toHaveBeenCalled();
  });
});
