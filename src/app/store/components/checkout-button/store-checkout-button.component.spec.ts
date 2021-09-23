/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import { StoreService } from 'src/app/store/store.service';
import { StoreCheckoutButtonComponent } from './store-checkout-button.component';

describe('StoreCheckoutButtonComponent', () => {
  let component: StoreCheckoutButtonComponent;
  let fixture: ComponentFixture<StoreCheckoutButtonComponent>;
  let mockCartService: Partial<StoreService>;
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
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreCheckoutButtonComponent ],
      providers: [
        { provide: StoreService, useValue: mockCartService },
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
