/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { of } from 'rxjs';
import { ProductCategoryTreeComponent } from './product-category-tree.component';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let component: ProductCategoryTreeComponent;
  let fixture: ComponentFixture<ProductCategoryTreeComponent>;
  let mockService: Partial<ProductCategoryTreeService>;
  let mockSnackbarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;
  // let dialogOpenSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockService = {
      categories$: of([]),
      setRootCategories() { },
      addNode() { return of(void 0); },
      editNode() { return of(void 0); }
    };
    mockSnackbarService = {
      open() { return void 0; }
    };
    mockDialogService = {
      open() {
        return {
          afterClosed() { return of(void 0); }
        } as MatDialogRef<any>;
      }
    };
    // dialogOpenSpy = spyOn(mockDialogService, 'open')
    //                   .and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<any>);

    TestBed.overrideComponent(
      ProductCategoryTreeComponent,
      {
        set: {
          providers: [ { provide: ProductCategoryTreeService, useValue: mockService } ]
        }
      }
    );
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTreeModule
      ],
      declarations: [ProductCategoryTreeComponent],
      providers: [
        // { provide: ProductCategoryTreeService, useValue: mockService },
        { provide: MatSnackBar, useValue: mockSnackbarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
