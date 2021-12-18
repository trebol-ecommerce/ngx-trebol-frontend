/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EventEmitter } from 'events';
import { of } from 'rxjs';
import { Product } from 'src/models/entities/Product';
import { StoreService } from '../../store.service';
import { StoreProductDetailsDialogComponent } from './store-product-details-dialog.component';
import { StoreProductDetailsDialogData } from "./StoreProductDetailsDialogData";

@Component({ selector: 'app-slideshow' })
class MockSlideshowComponent {
  @Input() images: any[];
  @Input() autocycle: boolean;
}

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
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
      ],
      declarations: [
        StoreProductDetailsDialogComponent,
        MockSlideshowComponent
      ],
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
