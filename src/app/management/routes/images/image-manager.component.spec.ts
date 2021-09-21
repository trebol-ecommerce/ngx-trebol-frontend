/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ImageManagerComponent } from './image-manager.component';
import { ImageManagerService } from './image-manager.service';

describe('ImageManagerComponent', () => {
  let component: ImageManagerComponent;
  let fixture: ComponentFixture<ImageManagerComponent>;
  let mockService: Partial<ImageManagerService>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockService = {
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      canEdit$: of(true),
      canAdd$: of(true),
      canDelete$: of(true),
      focusedItems: [],
      updateAccess() {}
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      declarations: [ ImageManagerComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ImageManagerService, useValue: mockService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
