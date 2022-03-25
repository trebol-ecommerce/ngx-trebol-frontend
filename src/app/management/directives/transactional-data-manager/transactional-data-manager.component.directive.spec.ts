/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EntityFormDialogConfig } from 'src/app/management/dialogs/entity-form/EntityFormDialogConfig';
import { TransactionalDataManagerComponentDirective } from './transactional-data-manager.component.directive';
import { TransactionalDataManagerServiceDirective } from './transactional-data-manager.service.directive';

@Component({
  selector: 'app-transactional-data-manager',
  template: '<div></div>'
})
class MockTransactionalDataManagerComponent
  extends TransactionalDataManagerComponentDirective<any> {
  constructor(
    protected service: TransactionalDataManagerServiceDirective<any>,
    protected dialogService: MatDialog,
    protected route: ActivatedRoute
  ) {
    super();
  }

  protected createDialogProperties(item: any): EntityFormDialogConfig<any> {
    return { data: item };
  }
}

describe('TransactionalDataManagerComponentDirective', () => {
  let component: MockTransactionalDataManagerComponent;
  let componentFixture: ComponentFixture<MockTransactionalDataManagerComponent>;
  let mockService: Partial<TransactionalDataManagerServiceDirective<any>>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockService = {
      loading$: of(false),
      focusedItems$: of([]),
      focusedItems: [],
      items$: of([]),
      totalCount$: of(0),
      canEdit$: of(false),
      canAdd$: of(false),
      canDelete$: of(false),
      reloadItems() { },
      updateAccess() { }
    };
    mockDialogService = {
      open() {
        return {
          afterClosed() { return of(void 0); }
        } as MatDialogRef<any>;
      }
    }

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([ { path: '', component: MockTransactionalDataManagerComponent } ])
      ],
      declarations: [
        MockTransactionalDataManagerComponent
      ],
      providers: [
        { provide: TransactionalDataManagerServiceDirective, useValue: mockService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    componentFixture = TestBed.createComponent(MockTransactionalDataManagerComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
