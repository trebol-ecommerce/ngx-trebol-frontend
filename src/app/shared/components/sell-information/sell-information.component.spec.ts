/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sell } from 'src/models/entities/Sell';
import { AddressPipe } from '../../pipes/address/address.pipe';
import { SellInformationComponent } from './sell-information.component';

describe('SellInformationComponent', () => {
  let component: SellInformationComponent;
  let fixture: ComponentFixture<SellInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        SellInformationComponent,
        AddressPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellInformationComponent);
    component = fixture.componentInstance;
    component.sell = new Sell();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
