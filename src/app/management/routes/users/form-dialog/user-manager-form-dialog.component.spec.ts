// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagerFormDialogComponent } from './user-manager-form-dialog.component';
import { UserManagerFormService } from './user-manager-form.service';

describe('UserManagerFormDialogComponent', () => {
  let component: UserManagerFormDialogComponent;
  let fixture: ComponentFixture<UserManagerFormDialogComponent>;
  let service: Partial<UserManagerFormService>;

  beforeEach(async(() => {
    service = {
      saving$: of(false),
      getPeople() { return of([]); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ UserManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(UserManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(UserManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
