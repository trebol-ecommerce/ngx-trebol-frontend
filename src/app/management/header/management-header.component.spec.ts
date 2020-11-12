// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Person } from 'src/app/models/entities/Person';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ManagementService } from '../management.service';
import { ManagementHeaderComponent } from './management-header.component';

describe('ManagementHeaderComponent', () => {
  let component: ManagementHeaderComponent;
  let fixture: ComponentFixture<ManagementHeaderComponent>;
  let managementService: Partial<ManagementService>;
  let appService: Partial<AppService>;

  beforeEach(async(() => {
    managementService = {
      switchSidenav() {},
      currentPageName$: of('')
    };

    appService = {
      getUserProfile() { return of(new Person()); },
      closeCurrentSession() {}
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularMaterialModule
      ],
      declarations: [ ManagementHeaderComponent ],
      providers: [
        { provide: ManagementService, useValue: managementService },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
