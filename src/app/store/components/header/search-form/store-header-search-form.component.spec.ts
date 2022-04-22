/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreSearchService } from 'src/app/store/store-search.service';
import { StoreHeaderSearchFormComponent } from './store-header-search-form.component';

describe('StoreHeaderSearchFormComponent', () => {
  let component: StoreHeaderSearchFormComponent;
  let fixture: ComponentFixture<StoreHeaderSearchFormComponent>;
  let searchServiceSpy: jasmine.SpyObj<StoreSearchService>;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const mockSearchService = jasmine.createSpyObj('StoreSearchService', ['updateSearchQuery', 'reload', 'paginate']);
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [ StoreHeaderSearchFormComponent ],
      providers: [
        { provide: StoreSearchService, useValue: mockSearchService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    searchServiceSpy = TestBed.inject(StoreSearchService) as jasmine.SpyObj<StoreSearchService>;
    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialogServiceSpy.open.and.returnValue({
      afterClosed() { return of(void 0); }
    } as MatDialogRef<any>);

    fixture = TestBed.createComponent(StoreHeaderSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
