/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
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

  it('should fire a `create` event', () => {
    observeIfEventFiresUponCallback(
      component.create,
      () => component.onClickCreate()
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});
