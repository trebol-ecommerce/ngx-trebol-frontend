/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreGuestPromptDialogComponent } from '../../dialogs/guest-prompt/store-guest-prompt-dialog.component';
import { StorePaymentRedirectPromptDialogComponent } from '../../dialogs/payment-redirect-prompt/store-payment-redirect-prompt-dialog.component';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let mockStoreService: Partial<StoreService>;
  let mockAppService: Partial<AppService>;
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
    mockAppService = {
      isLoggedIn() { return false; }
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
        MatIconModule,
        MatTableModule
      ],
      declarations: [ StoreCartReviewComponent ],
      providers: [
        { provide: StoreService, useValue: mockStoreService },
        { provide: AppService, useValue: mockAppService },
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

  it('should query user login status when the user accepts their shopping cart', () => {
    const isLoggedInSpy = spyOn(mockAppService, 'isLoggedIn');
    component.onClickAccept();
    expect(isLoggedInSpy).toHaveBeenCalled();
  });

  it('should prompt an options dialog when the user is not logged in after accepting their shopping cart', () => {
    component.onClickAccept();
    expect(dialogOpenSpy).toHaveBeenCalled();
    expect(dialogOpenSpy.calls.first().args[0]).toBe(StoreGuestPromptDialogComponent);
  });

  it('should prompt a payment redirection dialog when the user is logged in after accepting their shopping cart', () => {
    mockAppService.isLoggedIn = (() => true);
    component.onClickAccept();
    expect(dialogOpenSpy).toHaveBeenCalled();
    expect(dialogOpenSpy.calls.first().args[0]).toBe(StorePaymentRedirectPromptDialogComponent);
  });
});
