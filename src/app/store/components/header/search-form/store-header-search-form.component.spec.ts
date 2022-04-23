/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { concat, EMPTY, Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreSearchService } from 'src/app/store/store-search.service';
import { ProductCategory } from 'src/models/entities/ProductCategory';
import { StoreHeaderSearchFormComponent } from './store-header-search-form.component';

describe('StoreHeaderSearchFormComponent', () => {
  let component: StoreHeaderSearchFormComponent;
  let fixture: ComponentFixture<StoreHeaderSearchFormComponent>;
  let searchServiceSpy: jasmine.SpyObj<StoreSearchService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    const mockSearchService = jasmine.createSpyObj('StoreSearchService', ['updateSearchQuery', 'reload', 'paginate']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const mockActivatedRoute = {
      queryParams: concat(
        of({}),
        timer(5).pipe(
          map(() => ({ categoryCode: 'some-code' }))
        )
      )
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [ StoreHeaderSearchFormComponent ],
      providers: [
        { provide: StoreSearchService, useValue: mockSearchService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    searchServiceSpy = TestBed.inject(StoreSearchService) as jasmine.SpyObj<StoreSearchService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => EMPTY as Observable<any>
    } as MatDialogRef<any>);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));
    searchServiceSpy.reload.and.returnValue(EMPTY);
    searchServiceSpy.pageIndex = 0;

    fixture = TestBed.createComponent(StoreHeaderSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sync the service against the query parameters', () => {
    jasmine.clock().install();
    jasmine.clock().tick(5);
    expect(searchServiceSpy.updateSearchQuery).toHaveBeenCalled();
    expect(searchServiceSpy.reload).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('should change the query parameters when the filters change', () => {
    jasmine.clock().install();
    component.nameLike.setValue('some-name');
    jasmine.clock().tick(component.searchFiltersDebounceMs + 5);
    expect(routerSpy.navigate).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('should open dialog for picking a category', () => {
    component.onClickOpenCategoryPicker();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
  });

  it('should set the category code after selecting a category', () => {
    const mockCategory: ProductCategory = {
      code: 'some-code',
      name: 'some-name'
    };
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => of(mockCategory)
    } as MatDialogRef<any>);
    component.onClickOpenCategoryPicker();
    expect(component.categoryCode.value).toBe(mockCategory.code);
  });

  it('should clear the category code filter when the selected category is null', () => {
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => of(null)
    } as MatDialogRef<any>);
    component.onClickOpenCategoryPicker();
    expect(component.categoryCode.value).toBeNull();
  });

  it('should clear values', () => {
    component.onClickResetForm();
    expect(component.formGroup.pristine).toBeTrue();
  });
});
