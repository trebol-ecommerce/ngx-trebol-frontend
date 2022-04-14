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
import { EMPTY, Observable, of, throwError, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    const mockService = jasmine.createSpyObj('ProductCategoryTreeService', ['add', 'edit', 'remove', 'transformIntoNode', 'fetchFromNode', 'reloadCategories']);
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
    serviceSpy.transformIntoNode.and.returnValue(null);
    serviceSpy.categories$ = of([]);

    fixture = TestBed.createComponent(ProductCategoryTreeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('when there is initial data', () => {
    let categories: ProductCategory[];
    let randomIndex: number;
    let targetNode: ProductCategoryTreeFlatNode;
    let target: ProductCategory;

    beforeEach(() => {
      categories = [
        { code: 'some-code1', name: 'some-name1' },
        { code: 'some-code2', name: 'some-name2' },
        { code: 'some-code3', name: 'some-name3', parent: { code: 'some-code2', name: 'some-name2' } }
      ];
      serviceSpy.transformIntoNode.and.callFake((category, level) => ({
        level,
        expandable: (level > 0),
        name: category?.name || 'some-name'
      }));
      serviceSpy.categories$ = of(categories);
      fixture.detectChanges();

      const highestDataSourceIndex = component.dataSource.data.length - 1;
      randomIndex = Math.round(Math.random() * highestDataSourceIndex);
      targetNode = component.treeControl.dataNodes[randomIndex];
      target = component.dataSource.data[randomIndex];
    });

    beforeEach(() => {
      serviceSpy.fetchFromNode.and.callFake(node => of({
        name: node?.name || 'some-name',
        code: 'some-code'
      }));
    });

    it('should request details through a dialog in order to add a new subcategory', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => EMPTY as Observable<any>
      } as MatDialogRef<any>);

      component.onClickAddChildNodeTo(targetNode);
      expect(dialogServiceSpy.open).toHaveBeenCalled();
    });

    it('should add a new subcategory', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => of(target)
      } as MatDialogRef<any>);
      serviceSpy.add.and.returnValue(of(void 0));

      component.onClickAddChildNodeTo(targetNode);

      serviceSpy.add.and.returnValue(throwError({ status: 400 }));

      component.onClickAddChildNodeTo(targetNode);

      expect(serviceSpy.add).toHaveBeenCalled();
      expect(serviceSpy.add).toHaveBeenCalledWith(target);
    });

    it('should display a dialog to edit an existing category', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => EMPTY as Observable<any>
      } as MatDialogRef<any>);

      component.onClickEditNode(targetNode);
      expect(dialogServiceSpy.open).toHaveBeenCalled();
    });

    it('should edit an existing category', () => {
      dialogServiceSpy.open.and.returnValue({
        afterClosed: () => of(target)
      } as MatDialogRef<any>);
      serviceSpy.edit.and.returnValue(of(void 0));
      component.onClickEditNode(targetNode);
      expect(serviceSpy.edit).toHaveBeenCalled();

      serviceSpy.edit.and.returnValue(throwError({ status: 400 }));
      component.onClickEditNode(targetNode);

      expect(serviceSpy.edit).toHaveBeenCalledTimes(2);
    });

    it('should request confirmation before deleting any category', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(EMPTY);
      component.onClickDeleteNode(targetNode);
      expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    });

    it('should not delete a category if not confirmed', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));
      component.onClickDeleteNode(targetNode);
      expect(serviceSpy.remove).not.toHaveBeenCalled();
    });


    it('should delete a category', () => {
      sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
      serviceSpy.remove.and.returnValue(of(void 0));
      component.onClickDeleteNode(targetNode);
      expect(serviceSpy.remove).toHaveBeenCalled();

      serviceSpy.remove.and.returnValue(throwError({ status: 404 }));
      component.onClickDeleteNode(targetNode);

      expect(serviceSpy.remove).toHaveBeenCalledTimes(2);
    });

    describe('and is interfaced to pick a category', () => {
      beforeEach(() => {
        serviceSpy.fetchFromNode.and.returnValue(of(null));
        component.selectionEnabled = true;
      });

      it('should fire a `selection` event', () => {
        observeIfEventFiresUponCallback(
          component.selection,
          () => component.onClickTreeNode(targetNode),
          timer(1)
        ).pipe(
          tap(didFireEvent => expect(didFireEvent).toBeTrue())
        ).subscribe();
      });
    });
  });
});
