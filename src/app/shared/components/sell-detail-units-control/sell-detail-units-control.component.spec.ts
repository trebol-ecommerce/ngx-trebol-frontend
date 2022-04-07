/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize, take, tap } from 'rxjs/operators';
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

  it('should fire a decrease event', () => {
    let fired = false;
    component.decrease.pipe(
      take(1),
      tap(() => { fired = true; }),
      finalize(() => expect(fired).toBeTrue())
    ).subscribe();
    component.onClickDecrease();
  });

  it('should fire an increase event', () => {
    let fired = false;
    component.increase.pipe(
      take(1),
      tap(() => { fired = true; }),
      finalize(() => expect(fired).toBeTrue())
    ).subscribe();
    component.onClickIncrease();
  });
});
