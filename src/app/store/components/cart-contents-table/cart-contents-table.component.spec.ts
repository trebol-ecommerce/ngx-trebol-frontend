/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { StoreCartService } from 'src/app/store/routes/cart/store-cart.service';
import { CartContentsTableComponent } from './cart-contents-table.component';

describe('CartContentsTableComponent', () => {
  let component: CartContentsTableComponent;
  let fixture: ComponentFixture<CartContentsTableComponent>;
  let mockCartService: Partial<StoreCartService>;

  beforeEach(waitForAsync(() => {
    mockCartService = {
      cartDetails$: of([]),
      increaseProductUnits(i) {},
      decreaseProductUnits(i) {},
      removeProductFromCart(i) {}
    };
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule
      ],
      declarations: [ CartContentsTableComponent ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartContentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
