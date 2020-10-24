// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Person } from 'src/app/data/models/entities/Person';
import { SharedModule } from '../shared.module';
import { EditProfileFormDialogComponent } from './edit-profile-form-dialog.component';
import { EditProfileFormService } from './edit-profile-form.service';

describe('EditProfileFormDialogComponent', () => {
  let component: EditProfileFormDialogComponent;
  let fixture: ComponentFixture<EditProfileFormDialogComponent>;
  let service: Partial<EditProfileFormService>;

  beforeEach(async(() => {
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
    TestBed.overrideProvider(EditProfileFormService, { useValue: service })
    fixture = TestBed.createComponent(EditProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
