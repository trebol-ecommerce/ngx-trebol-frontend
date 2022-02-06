/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Receipt } from 'src/models/Receipt';
import { ReceiptDetail } from 'src/models/ReceiptDetail';
import { StoreReceiptCardComponent } from './store-receipt-card.component';

@Component({ selector: 'app-store-receipt-details-table' })
class MockReceiptDetailsTableComponent {
  @Input() details: ReceiptDetail[];
}

describe('StoreReceiptCardComponent', () => {
  let component: StoreReceiptCardComponent;
  let fixture: ComponentFixture<StoreReceiptCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [
        StoreReceiptCardComponent,
        MockReceiptDetailsTableComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiptCardComponent);
    component = fixture.componentInstance;
    component.receipt = new Receipt();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
