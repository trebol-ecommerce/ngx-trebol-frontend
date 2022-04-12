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
import { of } from 'rxjs';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { SharedDialogService } from '../../dialogs/shared-dialog.service';
import { ProductCategoryTreeComponent } from './product-category-tree.component';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let component: ProductCategoryTreeComponent;
  let fixture: ComponentFixture<ProductCategoryTreeComponent>;
  let serviceSpy: jasmine.SpyObj<ProductCategoryTreeService>;
  let snackbarServiceSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(waitForAsync(() => {
    const mockService = jasmine.createSpyObj('ProductCategoryTreeService', ['addNode', 'editNode', 'reloadCategories']);
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
    snackbarServiceSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;
    serviceSpy.categories$ = of([]);

    fixture = TestBed.createComponent(ProductCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should request details through a dialog', () => {
    dialogServiceSpy.open.and.returnValue({
      afterClosed() { return of(new ProductCategory); }
    } as MatDialogRef<any>);
  })

  xdescribe('when being used as an interface to pick a category', () => {
    let fakeCategory = { code: 'some-code', name: 'some-name' };
    let fakeTreeNode = { code: 'some-code', name: 'some-name' };
    beforeEach(() => {
      component.dataSource.data = [fakeCategory];
      component.selectionEnabled = true;
    });

    // it('should fire a `selection` event', () => {
    //   observeIfEventFiresUponCallback(
    //     component.selection,
    //     () => component.onClickTreeNode(fakeCategory),
    //   )

    // });
  });
});
