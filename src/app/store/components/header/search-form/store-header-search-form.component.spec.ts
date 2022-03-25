/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreSearchService } from 'src/app/store/store-search.service';
import { ProductSearchQuery } from 'src/models/ProductSearchQuery';
import { StoreHeaderSearchFormComponent } from './store-header-search-form.component';

describe('StoreHeaderSearchFormComponent', () => {
  let component: StoreHeaderSearchFormComponent;
  let fixture: ComponentFixture<StoreHeaderSearchFormComponent>;
  let mockStoreSearchService: Partial<StoreSearchService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockStoreSearchService = {
      searchQuery: new ProductSearchQuery(),
      pageIndex: 0,
      reload() { return of(void 0); }
    };
    mockDialogService = {
      open() {
        return {
          afterClosed() { return of(void 0); }
        } as MatDialogRef<any>;
      }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [ StoreHeaderSearchFormComponent ],
      providers: [
        { provide: StoreSearchService, useValue: mockStoreSearchService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
