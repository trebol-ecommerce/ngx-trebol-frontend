// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { PersonFormComponent } from 'src/app/shared/components/person-form/person-form.component';
import { SalespersonFormComponent } from './salesperson-form.component';

describe('SalespersonFormComponent', () => {
  let component: SalespersonFormComponent;
  let fixture: ComponentFixture<SalespersonFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [
        SalespersonFormComponent,
        PersonFormComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
