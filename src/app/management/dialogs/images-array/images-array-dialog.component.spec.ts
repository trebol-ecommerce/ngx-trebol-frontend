/**
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ImagesArrayDialogComponent } from './images-array-dialog.component';
import { ImagesArrayService } from './images-array.service';

describe('ImagesArrayDialogComponent', () => {
  let component: ImagesArrayDialogComponent;
  let fixture: ComponentFixture<ImagesArrayDialogComponent>;
  let mockDialogRef: Partial<MatDialogRef<ImagesArrayDialogComponent>>;
  let mockService: Partial<ImagesArrayService>;

  beforeEach(waitForAsync(() => {
    mockDialogRef = {
      close() {}
    };
    mockService = {
      imageOptions$: of([]),
      filter: '',
      triggerOptionsFetch() {}
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule
      ],
      declarations: [ ImagesArrayDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ImagesArrayService, useValue: mockService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesArrayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an array when the "accept" button is pressed', () => {
    const dialogCloseSpy = spyOn(mockDialogRef, 'close').and.callThrough();
    component.onClickAccept();
    expect(dialogCloseSpy.calls.mostRecent().args[0] instanceof Array).toBeTruthy()
  });
});
