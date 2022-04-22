/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MOCK_PEOPLE } from 'src/app/api/local-memory/mock/mock-people.datasource';
import { ProfileService } from 'src/app/profile.service';
import { EditProfileFormDialogComponent } from './edit-profile-form-dialog.component';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

@Component({
  selector: 'app-person-form',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: MockPersonFormComponent }]
})
class MockPersonFormComponent
  implements ControlValueAccessor {
  onchange = (v: any) => { }
  ontouched = () => { }
  writeValue(obj: any): void { }
  registerOnChange(fn: (v: any) => any): void { this.onchange = fn; }
  registerOnTouched(fn: () => any): void { this.ontouched = fn; }
}

const MOCK_PERSON_EXAMPLE = MOCK_PEOPLE[4];
const MOCK_PERSON_EXAMPLE2 = MOCK_PEOPLE[5];

describe('EditProfileFormDialogComponent', () => {
  let component: EditProfileFormDialogComponent;
  let fixture: ComponentFixture<EditProfileFormDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditProfileFormDialogComponent>>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(waitForAsync(() => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef<EditProfileFormDialogComponent>', ['close']);
    const mockSnackBarService = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockProfileService = jasmine.createSpyObj('ProfileService', ['getUserProfile', 'updateUserProfile']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        EditProfileFormDialogComponent,
        MockCenteredMatSpinnerComponent,
        MockPersonFormComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: ProfileService, useValue: mockProfileService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EditProfileFormDialogComponent>>;
    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    profileServiceSpy.getUserProfile.and.returnValue(of(MOCK_PERSON_EXAMPLE));
    profileServiceSpy.updateUserProfile.and.returnValue(of(void 0));

    fixture = TestBed.createComponent(EditProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid on initialization', () => {
    expect(component.formGroup.valid).toBeTrue();
  });

  it('should not submit an invalid form', () => {
    component.profile.setValue(null);
    expect(component.formGroup.invalid).toBeTrue();
    component.onSubmit();
    expect(profileServiceSpy.updateUserProfile).not.toHaveBeenCalled();
  });

  it('should submit its form only if changed and correctly filled', () => {
    component.profile.setValue(MOCK_PERSON_EXAMPLE2);
    expect(component.formGroup.valid).toBeTrue();
    component.onSubmit();
    expect(profileServiceSpy.updateUserProfile).toHaveBeenCalled();
  });
});
