/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';

@Component({ selector: 'app-store-cart-contents-table' })
class MockStoreCartContenstTableComponent { }

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
  let mockStoreService: Partial<StoreService>;
  let mockDialogService: Partial<MatDialog>;
  let dialogOpenSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      cartDetails$: of([]),
      cartNetValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    mockDialogService = {
      open() { return void 0; }
    };
    dialogOpenSpy = spyOn(mockDialogService, 'open')
                      .and.returnValue({ afterClosed: () => of(null) } as MatDialogRef<any>);

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
        { provide: StoreService, useValue: mockStoreService },
        { provide: MatDialog, useValue: mockDialogService }
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
