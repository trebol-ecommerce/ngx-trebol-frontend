/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatListOption, MatSelectionListChange } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { MOCK_IMAGES } from 'src/app/api/local-memory/mock/mock-images.datasource';
import { ITransactionalEntityDataApiService } from 'src/app/api/transactional-entity.data-api.iservice';
import { Image } from 'src/models/entities/Image';
import { ImagesArrayDialogComponent } from './images-array-dialog.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

const MOCK_IMAGE_EXAMPLE = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];

describe('ImagesArrayDialogComponent', () => {
  let component: ImagesArrayDialogComponent;
  let fixture: ComponentFixture<ImagesArrayDialogComponent>;
  let apiServiceSpy: jasmine.SpyObj<IEntityDataApiService<Image>>;

  beforeEach(waitForAsync(() => {
    const mockApiService = jasmine.createSpyObj('IEntityDataApiService<Image>', ['fetchPage']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule
      ],
      declarations: [
        ImagesArrayDialogComponent,
        MockCenteredMatSpinnerComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: API_INJECTION_TOKENS.dataImages, useValue: mockApiService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataImages) as jasmine.SpyObj<ITransactionalEntityDataApiService<Image>>;
    apiServiceSpy.fetchPage.and.returnValue(of({
      items: [
        MOCK_IMAGE_EXAMPLE
      ],
      pageIndex: 0,
      pageSize: 10,
      totalCount: 1
    }));

    fixture = TestBed.createComponent(ImagesArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reload data', () => {
    component.reload();
    expect(apiServiceSpy.fetchPage).toHaveBeenCalled();
  });

  it('should reload data when a page event is fired', () => {
    const ev: PageEvent = { length: 10, pageIndex: 1, pageSize: 5 };
    component.onPage(ev);
    expect(apiServiceSpy.fetchPage).toHaveBeenCalled();
  });

  it('should update its inner selection model when firing a selection event', () => {
    const ev: Partial<MatSelectionListChange> = {
      options: [{ value: MOCK_IMAGE_EXAMPLE, selected: true }] as MatListOption[]
    };
    component.onSelectionChange(ev as MatSelectionListChange);
    expect(component.selectedImages[0]).toEqual(MOCK_IMAGE_EXAMPLE);
  });
});
