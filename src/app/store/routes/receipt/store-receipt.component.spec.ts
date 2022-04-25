/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { Receipt } from 'src/models/Receipt';
import { StoreReceiptComponent } from './store-receipt.component';
import { StoreReceiptService } from './store-receipt.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({ selector: 'app-store-receipt-card' })
class MockStoreReceiptCardComponent {
  @Input() receipt: Receipt;
}

describe('StoreReceiptComponent', () => {
  let component: StoreReceiptComponent;
  let fixture: ComponentFixture<StoreReceiptComponent>;
  let mockService: Partial<StoreReceiptService>;

  beforeEach(waitForAsync(() => {
    // TODO use jasmine.SpyObj
    mockService = {
      fetchReceipt() { return EMPTY; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [
        StoreReceiptComponent,
        MockCenteredMatSpinnerComponent,
        MockStoreReceiptCardComponent
      ],
      providers: [
        { provide: StoreReceiptService, useValue: mockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
