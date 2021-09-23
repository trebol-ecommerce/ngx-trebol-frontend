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
import { StoreService } from 'src/app/store/store.service';
import { StoreCartContentsTableComponent } from './store-cart-contents-table.component';

describe('StoreStoreCartContentsTableComponent', () => {
  let component: StoreCartContentsTableComponent;
  let fixture: ComponentFixture<StoreCartContentsTableComponent>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
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
      declarations: [ StoreCartContentsTableComponent ],
      providers: [
        { provide: StoreService, useValue: mockStoreService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCartContentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
