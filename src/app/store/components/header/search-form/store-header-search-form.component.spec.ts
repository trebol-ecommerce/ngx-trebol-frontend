/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreHeaderSearchFormComponent } from './store-header-search-form.component';

describe('StoreHeaderSearchFormComponent', () => {
  let component: StoreHeaderSearchFormComponent;
  let fixture: ComponentFixture<StoreHeaderSearchFormComponent>;
  // let mockStoreCatalogService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    // mockStoreCatalogService = {
    //   reloadFrontpageLists() {}
    // };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [ StoreHeaderSearchFormComponent ],
      providers: [
        // { provide: StoreFrontpageService, useValue: mockStoreCatalogService }
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
