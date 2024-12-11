/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { OrderDetailUnitsControlComponent } from './order-detail-units-control.component';

describe('OrderDetailUnitsControlComponent', () => {
  let component: OrderDetailUnitsControlComponent;
  let fixture: ComponentFixture<OrderDetailUnitsControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ OrderDetailUnitsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailUnitsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire a `decrease` event', () => {
    observeIfEventFiresUponCallback(
      component.decrease,
      () => component.onClickDecrease()
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });

  it('should fire an `increase` event', () => {
    observeIfEventFiresUponCallback(
      component.increase,
      () => component.onClickIncrease()
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});
