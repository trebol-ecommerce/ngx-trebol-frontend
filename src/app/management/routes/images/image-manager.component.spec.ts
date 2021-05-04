// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ImageManagerComponent } from './image-manager.component';
import { ImageManagerService } from './image-manager.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('ImageManagerComponent', () => {
  let component: ImageManagerComponent;
  let fixture: ComponentFixture<ImageManagerComponent>;
  let mockService: Partial<ImageManagerService>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockService = {
      removeItems() { return of([true]); },
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
