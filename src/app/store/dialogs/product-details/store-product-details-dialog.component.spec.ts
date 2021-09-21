/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Product } from 'src/app/models/entities/Product';
import { StoreService } from '../../store.service';
import { StoreProductDetailsDialogComponent, StoreProductDetailsDialogData } from './store-product-details-dialog.component';

describe('StoreProductDetailsDialogComponent', () => {
  let component: StoreProductDetailsDialogComponent;
  let fixture: ComponentFixture<StoreProductDetailsDialogComponent>;
  let storeService: Partial<StoreService>;
  let mockDialogData: Partial<StoreProductDetailsDialogData>;

  beforeEach(waitForAsync(() => {
    storeService = {
      cartDetails$: of([]),
      increaseProductUnits(i) {},
      addProductToCart(p) {},
      decreaseProductUnits(i) {}
    };
    mockDialogData = {
      product: new Product()
    };

    TestBed.configureTestingModule({
      declarations: [ StoreProductDetailsDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: StoreService, useValue: storeService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
