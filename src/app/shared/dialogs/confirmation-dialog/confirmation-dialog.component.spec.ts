/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogData } from './ConfirmationDialogData';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let data: Partial<ConfirmationDialogData>;

  beforeEach(waitForAsync(() => {
    data = {
      title: 'Example',
      message: 'Sample text'
    };

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [ ConfirmationDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
