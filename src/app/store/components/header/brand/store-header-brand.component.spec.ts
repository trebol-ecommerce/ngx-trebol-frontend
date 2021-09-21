/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { StoreHeaderBrandComponent } from './store-header-brand.component';

describe('StoreHeaderBrandComponent', () => {
  let component: StoreHeaderBrandComponent;
  let fixture: ComponentFixture<StoreHeaderBrandComponent>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      declarations: [ StoreHeaderBrandComponent ],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
