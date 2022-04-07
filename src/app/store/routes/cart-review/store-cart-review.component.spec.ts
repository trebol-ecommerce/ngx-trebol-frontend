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
import { SessionService } from 'src/app/session.service';
import { StoreCartService } from '../../store-cart.service';
import { StoreCartReviewComponent } from './store-cart-review.component';

@Component({ selector: 'app-sell-details-table' })
class MockStoreCartContenstTableComponent {
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
  let mockCartService: Partial<StoreCartService>;
  let mockSessionService: Partial<SessionService>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
      cartDetails$: of([]),
      cartNetValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    mockSessionService = {
      userHasActiveSession$: of(true)
    };

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
        { provide: StoreCartService, useValue: mockCartService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
