/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddressesEditorFormComponent } from './addresses-editor-form.component';

describe('AddressesEditorFormComponent', () => {
  let component: AddressesEditorFormComponent;
  let fixture: ComponentFixture<AddressesEditorFormComponent>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule
      ],
      declarations: [ AddressesEditorFormComponent ],
      providers: [
        { provide: MatDialog, useValue: mockDialogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
