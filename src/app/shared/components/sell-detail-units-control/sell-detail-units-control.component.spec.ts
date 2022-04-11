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
import { SellDetailUnitsControlComponent } from './sell-detail-units-control.component';

describe('SellDetailUnitsControlComponent', () => {
  let component: SellDetailUnitsControlComponent;
  let fixture: ComponentFixture<SellDetailUnitsControlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ SellDetailUnitsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellDetailUnitsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire a `decrease` event', () => {
    observeIfEventFiresUponCallback(
      component.decrease,
      () => component.onClickDecrease(),
      timer(1)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });

  it('should fire an `increase` event', () => {
    observeIfEventFiresUponCallback(
      component.increase,
      () => component.onClickIncrease(),
      timer(1)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});
