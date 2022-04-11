/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { merge, of, timer } from 'rxjs';
import { finalize, map, take, takeLast, takeUntil, tap } from 'rxjs/operators';
import { ManagementDataActionsButtonBarComponent } from './management-data-actions-button-bar.component';

describe('ManagementDataActionsButtonBarComponent', () => {
  let component: ManagementDataActionsButtonBarComponent;
  let fixture: ComponentFixture<ManagementDataActionsButtonBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule
      ],
      declarations: [ ManagementDataActionsButtonBarComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDataActionsButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire an `add` event', () => {
    merge(
      component.add.pipe(
        takeUntil(timer(50)),
        take(1),
        map(() => true)
      ),
      of(false).pipe(
        finalize(() => component.onClickAdd())
      )
    ).pipe(
      takeLast(1),
      tap(fired => expect(fired).toBeTrue())
    ).subscribe();
  });

  it('should fire a `delete` event', () => {
    merge(
      component.delete.pipe(
        takeUntil(timer(50)),
        take(1),
        map(() => true)
      ),
      of(false).pipe(
        finalize(() => component.onClickDelete())
      )
    ).pipe(
      takeLast(1),
      tap(fired => expect(fired).toBeTrue())
    ).subscribe();
  });
});
