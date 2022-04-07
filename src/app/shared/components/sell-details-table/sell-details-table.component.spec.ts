/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SellDetailsTableComponent } from './sell-details-table.component';

@Component({ selector: 'app-sell-detail-units-control' })
class MockSellDetailUnitsControlComponent {
  @Input() units: number;
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
}

describe('SellDetailsTableComponent', () => {
  let component: SellDetailsTableComponent;
  let fixture: ComponentFixture<SellDetailsTableComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule
      ],
      declarations: [
        MockSellDetailUnitsControlComponent,
        SellDetailsTableComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
