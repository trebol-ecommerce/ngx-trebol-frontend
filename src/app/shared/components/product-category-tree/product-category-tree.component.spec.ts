/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { EMPTY, Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { SharedDialogService } from '../../dialogs/shared-dialog.service';
import { ProductCategoryTreeComponent } from './product-category-tree.component';
import { ProductCategoryTreeService } from './product-category-tree.service';
import { ProductCategoryTreeFlatNode } from './ProductCategoryTreeFlatNode';

describe('ProductCategoryTreeComponent', () => {
  let component: ProductCategoryTreeComponent;
  let fixture: ComponentFixture<ProductCategoryTreeComponent>;
  let serviceSpy: jasmine.SpyObj<ProductCategoryTreeService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ProductCategoryTreeService', ['addNode', 'editNode', 'deleteNode', 'transformNode', 'fetchCategoryFromNode', 'reloadCategories']);
    const mockSnackbarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);
    const mockSharedDialogService = jasmine.createSpyObj('SharedDialogService', ['requestConfirmation']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTreeModule
      ],
      declarations: [ProductCategoryTreeComponent],
      providers: [
        { provide: ProductCategoryTreeService, useValue: mockService },
        { provide: MatSnackBar, useValue: mockSnackbarService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    serviceSpy = TestBed.inject(ProductCategoryTreeService) as jasmine.SpyObj<ProductCategoryTreeService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;
    serviceSpy.fetchCategoryFromNode.and.returnValue(null);
    serviceSpy.transformNode.and.returnValue(null);
    serviceSpy.categories$ = of([]);

    fixture = TestBed.createComponent(ProductCategoryTreeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('when there is initial data', () => {
    let randomIndex: number;
    let targetNode: ProductCategoryTreeFlatNode;
    let target: ProductCategory;

    beforeEach(() => {
      serviceSpy.fetchCategoryFromNode.and.callFake((node) => ({
        name: node.name,
        code: 'some-code'
      }));
      serviceSpy.transformNode.and.callFake((category, level) => ({
        level,
        expandable: (level > 0),
        name: category.name
      }));
      serviceSpy.categories$ = of([
        { code: 'some-code1', name: 'some-name1' },
        { code: 'some-code2', name: 'some-name2' },
        { code: 'some-code3', name: 'some-name3' }
      ]);
      fixture.detectChanges();

      const highestDataSourceIndex = component.dataSource.data.length - 1;
      randomIndex = Math.round(Math.random() * highestDataSourceIndex);
      targetNode = component.treeControl.dataNodes[randomIndex];
      target = component.dataSource.data[randomIndex];
    });

    it('should request details through a dialog when adding a new subcategory', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: (() => EMPTY as Observable<any>)
      } as MatDialogRef<any>);

      component.onClickAddChildNodeTo(targetNode);
      expect(dialogServiceSpy.open).toHaveBeenCalled();
    });

    it('should request confirmation before deleting any category', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(EMPTY);
      component.onClickDeleteNode(targetNode);
      expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    });

    it('should only delete a category when confirmed to', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));
      component.onClickDeleteNode(targetNode);
      expect(serviceSpy.deleteNode).not.toHaveBeenCalled();

      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
      serviceSpy.deleteNode.and.returnValue(EMPTY);
      component.onClickDeleteNode(targetNode);
      expect(serviceSpy.deleteNode).toHaveBeenCalled();
    });

    xit('should request details through a dialog when adding a new subcategory', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed() { return of(target); }
      } as MatDialogRef<any>);

      component.onClickAddChildNodeTo(targetNode);
      expect(dialogServiceSpy.open).toHaveBeenCalled();
    });

    describe('when being used as an interface to pick a category', () => {
      beforeEach(() => {
        component.selectionEnabled = true;
      });

      it('should fire a `selection` event', () => {
        observeIfEventFiresUponCallback(
          component.selection,
          () => component.onClickTreeNode(targetNode),
        ).subscribe();
      });
    });
  });
});
