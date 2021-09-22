/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ManagementService } from 'src/app/management/management.service';
import { Person } from 'src/app/models/entities/Person';
import { ManagementHeaderComponent } from './management-header.component';

describe('ManagementHeaderComponent', () => {
  let component: ManagementHeaderComponent;
  let fixture: ComponentFixture<ManagementHeaderComponent>;
  let managementService: Partial<ManagementService>;
  let appService: Partial<AppService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
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
        CommonModule,
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [ ManagementHeaderComponent ],
      providers: [
        { provide: ManagementService, useValue: managementService },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
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
