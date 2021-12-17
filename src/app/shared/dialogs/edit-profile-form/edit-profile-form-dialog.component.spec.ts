/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Person } from 'src/models/entities/Person';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditProfileFormDialogComponent } from './edit-profile-form-dialog.component';
import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormDialogComponent', () => {
  let component: EditProfileFormDialogComponent;
  let fixture: ComponentFixture<EditProfileFormDialogComponent>;
  let service: Partial<EditProfileFormService>;

  beforeEach(waitForAsync(() => {
    service = {
      saving$: of(false),
      confirmCancel$: of(false),
      loadProfile() { return of(new Person()); },
      saveProfile() { return of(true); },
      confirmCancel() { }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        EditProfileFormDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(EditProfileFormService, { useValue: service });
    fixture = TestBed.createComponent(EditProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
