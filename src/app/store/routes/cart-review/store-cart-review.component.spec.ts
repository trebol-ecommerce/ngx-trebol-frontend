// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of, EMPTY } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let mockStoreService: Partial<StoreService>;
  let mockAppService: Partial<AppService>;
  let router: Router;
  let dialogService: MatDialog;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      cartDetails$: of([]),
      cartSubtotalValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    mockAppService = {
      isLoggedIn() { return false; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatTableModule
      ],
      declarations: [ StoreCartReviewComponent ],
      providers: [
        { provide: StoreService, useValue: mockStoreService },
        { provide: AppService, useValue: mockAppService }
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    dialogService = TestBed.inject(MatDialog);
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
});
