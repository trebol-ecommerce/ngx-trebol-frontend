/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
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
  let serviceSpy: jasmine.SpyObj<TransactionalDataManagerServiceDirective<any>>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('TransactionalDataManagerServiceDirective<any>', ['reloadItems', 'updateAccess']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

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
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(TransactionalDataManagerServiceDirective) as
      jasmine.SpyObj<TransactionalDataManagerServiceDirective<any>>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    serviceSpy.reloadItems.and.returnValue(EMPTY);
    serviceSpy.loading$ = of(false);
    serviceSpy.focusedItems$ = of([]);
    serviceSpy.focusedItems = [];
    serviceSpy.items$ = of([]);
    serviceSpy.totalCount$ = of(0);
    dialogServiceSpy.open.and.returnValue({ afterClosed: () => of(void 0) } as MatDialogRef<any>);

    componentFixture = TestBed.createComponent(MockTransactionalDataManagerComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward a request to paginate data', () => {
    component.onPage(new PageEvent());
    expect(serviceSpy.reloadItems).toHaveBeenCalled();
  });

  it('should forward a request to sort data', () => {
    component.onSortChange({ active: 'some-column', direction: 'asc' });
    expect(serviceSpy.reloadItems).toHaveBeenCalled();
  });

  it('should open a dialog to add new data', () => {
    component.onClickCreate();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  });

  it('should open a dialog to edit one item of data', () => {
    component.onClickEdit({ foo: 'bar' });
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  });

  it('should reload data after succesfully editing an item', () => {
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => of({ foo: 'bar2' }) // so it changed
    } as MatDialogRef<any>);
    component.onClickEdit({ foo: 'bar' });
    expect(serviceSpy.reloadItems).toHaveBeenCalled();
  });
});
