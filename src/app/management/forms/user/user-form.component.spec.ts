/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { MOCK_USERS } from 'src/app/api/local-memory/mock/mock-users.datasource';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { Person } from 'src/models/entities/Person';
import { UserRole } from 'src/models/entities/UserRole';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-user-form formControlName="user"></app-user-form></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(UserFormComponent, { static: true }) userFormComponent: UserFormComponent;

  formGroup = new UntypedFormGroup({ user: new UntypedFormControl(null) });
  get user() { return this.formGroup.get('user') as UntypedFormControl; }
}

const mockUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];

describe('UserFormComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: UserFormComponent;
  let peopleDataApiServiceSpy: jasmine.SpyObj<IEntityDataApiService<Person>>;
  let userRolesDataApiServiceSpy: jasmine.SpyObj<IEntityDataApiService<UserRole>>;

  beforeEach(waitForAsync(() => {
    const mockPeopleDataApiService = jasmine.createSpyObj('IEntityDataApiService<Person>', ['fetchPage']);
    const mockUserRolesDataApiService = jasmine.createSpyObj('IEntityDataApiService<UserRole>', ['fetchPage']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [
        UserFormComponent,
        MockHigherOrderFormComponent
      ],
      providers: [
        { provide: API_INJECTION_TOKENS.dataPeople, useValue: mockPeopleDataApiService },
        { provide: API_INJECTION_TOKENS.dataUserRoles, useValue: mockUserRolesDataApiService },
        EntityFormGroupFactoryService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    peopleDataApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataPeople) as jasmine.SpyObj<IEntityDataApiService<Person>>;
    userRolesDataApiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataUserRoles) as jasmine.SpyObj<IEntityDataApiService<UserRole>>;;
    peopleDataApiServiceSpy.fetchPage.and.returnValue(EMPTY);
    userRolesDataApiServiceSpy.fetchPage.and.returnValue(EMPTY);

    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.userFormComponent;
  });

  describe('before its first change', () => {
    it('should create', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should have a safe ControlValueAccesor stub implementation', () => {
      expect(() => {
        component.onChange(null);
        component.onTouched();
        component.writeValue(null);
        component.setDisabledState(false);
      }).not.toThrowError();
    });

    it('should have a safe Validator stub implementation', () => {
      expect(() => {
        component.onValidatorChange();
        component.validate(null);
      }).not.toThrowError();
    });
  });

  describe('after its first change', () => {
    beforeEach(() => {
      fixture.detectChanges();
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should persist', () => {
      expect(containerForm).toBeTruthy();
      expect(component).toBeTruthy();
    });

    it('should not a have valid form state at creation time', () => {
      expect(containerForm.formGroup.invalid).toBeTrue();
      expect(component.formGroup.invalid).toBeTrue();
    });

    it('should propagate its value to a higher order form', () => {
      expect(containerForm.user.value).not.toEqual(mockUser);
      component.name.setValue(mockUser.name);
      component.password.setValue(mockUser.password);
      component.person.setValue(mockUser.person);
      component.role.setValue(mockUser.role);
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.user.value).toEqual(mockUser);
      component.formGroup.reset({ value: null });
      jasmine.clock().tick(component.formChangesDebounceTimeMs);
      expect(containerForm.user.value).not.toEqual(mockUser);
    });

    it('should receive and process values from a higher order form', () => {
      containerForm.user.setValue(mockUser);
      expect(component.name.value).toEqual(mockUser.name);
      expect(component.password.value).toEqual(mockUser.password);
      expect(component.person.value).toEqual(mockUser.person);
      expect(component.role.value).toEqual(mockUser.role);
      containerForm.user.setValue(null);
      expect(component.name.value).toBeFalsy();
      expect(component.password.value).toBeFalsy();
      expect(component.person.value).toBeFalsy();
      expect(component.role.value).toBeFalsy();
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.formGroup.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.formGroup.enabled).toBeTrue();
    });

    it('should accept instances of User as valid input', () => {
      containerForm.user.setValue(mockUser);
      expect(component.formGroup.valid).toBeTrue();
    });

    it('should treat non-User-instances as invalid input', () => {
      const notAnUser = {
        foo: 'example',
        bar: 'test'
      };
      containerForm.user.setValue(notAnUser);
      expect(component.formGroup.invalid).toBeTrue();
    });
  });

  it('should fetch data for its dropdown boxes', () => {
    const emptyPage = of({
      items: [],
      totalCount: 0,
      pageIndex: 0,
      pageSize: 10
    });
    peopleDataApiServiceSpy.fetchPage.and.returnValue(emptyPage);
    userRolesDataApiServiceSpy.fetchPage.and.returnValue(emptyPage);
    fixture.detectChanges();

    expect(peopleDataApiServiceSpy.fetchPage).toHaveBeenCalled();
    expect(userRolesDataApiServiceSpy.fetchPage).toHaveBeenCalled();
  });
});
