// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { StoreService } from '../../store.service';
import { StoreCartReviewComponent } from './store-cart-review.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

describe('StoreCartReviewComponent', () => {
  let component: StoreCartReviewComponent;
  let fixture: ComponentFixture<StoreCartReviewComponent>;
  let storeService: Partial<StoreService>;
  let appService: Partial<AppService>;
  let router: Router;

  beforeEach(async(() => {
    storeService = {
      cartDetails$: of([]),
      cartSubtotalValue$: of(0),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    appService = {
      isLoggedIn() { return false; }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        MatTableModule
      ],
      declarations: [ StoreCartReviewComponent ],
      providers: [
        { provide: StoreService, useValue: storeService },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();

    router = TestBed.get(Router);
    spyOn(router,"navigateByUrl");
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
