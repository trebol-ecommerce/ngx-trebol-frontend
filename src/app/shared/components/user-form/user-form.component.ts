// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component, OnInit, Inject, OnDestroy, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  ControlValueAccessor, Validator, AbstractControl, ValidationErrors
} from '@angular/forms';
import { Observable, Subscription, merge } from 'rxjs';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { map, debounceTime, tap } from 'rxjs/operators';
import { isJavaScriptObject } from 'src/functions/isJavaScriptObject';
import { collectValidationErrors } from 'src/functions/collectionValidationErrors';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [ './user-form.component.css' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UserFormComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: UserFormComponent
    }
  ]
})
export class UserFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator, FormGroupOwner {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
  private touched = new EventEmitter<void>();

  people$: Observable<Person[]>;
  roles$: Observable<UserRole[]>;

  formGroup: FormGroup;
  get name() { return this.formGroup.get('name') as FormControl; }
  get password() { return this.formGroup.get('password') as FormControl; }
  get person() { return this.formGroup.get('person') as FormControl; }
  get role() { return this.formGroup.get('role') as FormControl; }

  constructor(
    @Inject(API_SERVICE_INJECTION_TOKENS.dataPeople) protected peopleDataApiService: IEntityDataApiService<Person>,
    @Inject(API_SERVICE_INJECTION_TOKENS.dataUserRoles) protected userRolesDataApiService: IEntityDataApiService<UserRole>,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: [''],
      person: [undefined, Validators.required],
      role: [undefined, Validators.required],
    });
  }

  ngOnInit(): void {
    this.people$ = this.peopleDataApiService.fetchPage().pipe(map(page => page.items));
    this.roles$ = this.userRolesDataApiService.fetchPage().pipe(map(page => page.items));
  }

  ngOnDestroy(): void {
    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
  }

  writeValue(obj: any): void {
    this.name.reset('', { emitEvent: false });
    this.password.reset('', { emitEvent: false });
    this.person.reset('', { emitEvent: false });
    this.role.reset('', { emitEvent: false });
    if (isJavaScriptObject(obj)) {
      this.formGroup.patchValue(obj);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formGroup.valueChanges.pipe(debounceTime(250), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(this.touched).pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: false });
    } else {
      this.formGroup.enable({ emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return collectValidationErrors(control);
  }

  onParentFormTouched(): void {
    this.formGroup.markAllAsTouched();
  }

}
