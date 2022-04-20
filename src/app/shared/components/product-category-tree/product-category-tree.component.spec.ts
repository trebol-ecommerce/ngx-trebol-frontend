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

const MOCK_CATEGORIES: ProductCategory[] = [
  {
    code: 'some-code1',
    name: 'some-name1'
  },
  {
    code: 'some-code2',
    name: 'some-name2'
  },
  {
    code: 'some-code3',
    name: 'some-name3',
    parent: { code: 'some-code2' }
  }
];

describe('ProductCategoryTreeComponent', () => {
  let component: ProductCategoryTreeComponent;
  let fixture: ComponentFixture<ProductCategoryTreeComponent>;
  let serviceSpy: jasmine.SpyObj<ProductCategoryTreeService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ProductCategoryTreeService', ['add', 'edit', 'remove', 'reloadCategories']);
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
    serviceSpy.reloadCategories.and.returnValue(EMPTY);
    serviceSpy.categories$ = of([]);

    fixture = TestBed.createComponent(ProductCategoryTreeComponent);
    component = fixture.componentInstance;
    // component.editable = false;
    // component.selectionEnabled = false;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(serviceSpy.reloadCategories).toHaveBeenCalled();
  });

  describe('when there is initial data', () => {
    let target: ProductCategory;
    let targetNode: ProductCategoryTreeFlatNode;

    beforeEach(() => {
      const parentingCategory: ProductCategory = {
        code: MOCK_CATEGORIES[1].code,
        name: MOCK_CATEGORIES[1].name,
        children: [{
          code: MOCK_CATEGORIES[2].code,
          name: MOCK_CATEGORIES[2].name
        }]
      };
      const nestedCategories = [
        MOCK_CATEGORIES[0],
        parentingCategory
      ];
      serviceSpy.categories$ = of(nestedCategories);
      fixture.detectChanges();
      target = nestedCategories[Math.floor(Math.random() * nestedCategories.length)];
      targetNode = component.nestedNodeMap.get(target);
    });

    it('should map each existing category to an equivalent flat tree node and viceversa', () => {
      expect(targetNode).toBeTruthy();
      const mappedTarget = component.flatNodeMap.get(targetNode);
      expect(mappedTarget).toBeTruthy();
      expect(mappedTarget).toEqual(target);
    });

    describe('and is configured to pick a category', () => {
      beforeEach(() => {
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

    describe('and is configured to manage existing categories', () => {
      beforeEach(() => {
        component.editable = true;
        dialogServiceSpy.open.and.returnValue({
          afterClosed: () => EMPTY as Observable<any>
        } as MatDialogRef<any>);
        serviceSpy.add.and.returnValue(of(target));
        serviceSpy.edit.and.returnValue(of(target));
        serviceSpy.remove.and.returnValue(of(void 0));
        sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));
      });

      it('should open a dialog to fill in data for a new subcategory', () => {
        component.onClickAddChildNodeTo(targetNode);
        expect(dialogServiceSpy.open).toHaveBeenCalled();
      });

      it('should add a new subcategory', () => {
        dialogServiceSpy.open.and.returnValue({
          afterClosed: () => of(target)
        } as MatDialogRef<any>);
        component.onClickAddChildNodeTo(targetNode);
        expect(serviceSpy.add).toHaveBeenCalled();
      });

      it('should open a dialog to edit the data of an existing category', () => {
        component.onClickEditNode(targetNode);
        expect(dialogServiceSpy.open).toHaveBeenCalled();
      });

      it('should edit an existing category', () => {
        dialogServiceSpy.open.and.returnValue({
          afterClosed: () => of(target)
        } as MatDialogRef<any>);
        component.onClickEditNode(targetNode);
        expect(serviceSpy.edit).toHaveBeenCalled();
      });

      it('should request confirmation before deleting any category', () => {
        component.onClickDeleteNode(targetNode);
        expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
        expect(serviceSpy.remove).not.toHaveBeenCalled();
      });

      it('should delete a category', () => {
        sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
        component.onClickDeleteNode(targetNode);
        expect(serviceSpy.remove).toHaveBeenCalled();
      });
    });

    describe('and is used with default configuration (just browse existing categories)', () => {
      it('should not allow to add subcategories', () => {
        component.onClickAddChildNodeTo(targetNode);
        expect(dialogServiceSpy.open).not.toHaveBeenCalled();
      });

      it('should not allow to edit categories', () => {
        component.onClickEditNode(targetNode);
        expect(dialogServiceSpy.open).not.toHaveBeenCalled();
      });

      it('should not allow to delete categories', () => {
        component.onClickDeleteNode(targetNode);
        expect(sharedDialogServiceSpy.requestConfirmation).not.toHaveBeenCalled();
      });
    });
  });
});
