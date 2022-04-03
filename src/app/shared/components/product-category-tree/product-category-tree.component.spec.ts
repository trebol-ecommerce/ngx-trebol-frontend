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
import { SharedDialogService } from '../../dialogs/shared-dialog.service';
import { ProductCategoryTreeComponent } from './product-category-tree.component';
import { ProductCategoryTreeService } from './product-category-tree.service';

describe('ProductCategoryTreeService', () => {
  let component: ProductCategoryTreeComponent;
  let fixture: ComponentFixture<ProductCategoryTreeComponent>;
  let mockService: Partial<ProductCategoryTreeService>;
  let mockSnackbarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;
  let mockSharedDialogService: Partial<SharedDialogService>;

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
    mockSharedDialogService = {
      requestConfirmation() { return of(false); }
    };

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
        MatButtonModule,
        MatIconModule,
        MatTreeModule
      ],
      declarations: [ProductCategoryTreeComponent],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackbarService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
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
