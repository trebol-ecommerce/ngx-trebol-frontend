/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { PersonFormComponent } from 'src/app/shared/forms/person/person-form.component';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { SalespersonFormComponent } from './salesperson-form.component';

describe('SalespersonFormComponent', () => {
  let component: SalespersonFormComponent;
  let fixture: ComponentFixture<SalespersonFormComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        AngularMaterialModule
      ],
      declarations: [
        SalespersonFormComponent,
        PersonFormComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        EntityFormGroupFactoryService
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
