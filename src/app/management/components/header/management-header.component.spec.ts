/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ManagementService } from 'src/app/management/management.service';
import { ManagementHeaderComponent } from './management-header.component';

@Component({ selector: 'app-management-header-sidenav-button' })
class MockManagementHeaderSidenavButtonComponent { }

@Component({ selector: 'app-management-header-menu' })
class MockManagementHeaderMenuComponent { }

describe('ManagementHeaderComponent', () => {
  let component: ManagementHeaderComponent;
  let fixture: ComponentFixture<ManagementHeaderComponent>;
  let mockManagementService: Partial<ManagementService>;

  beforeEach(waitForAsync(() => {
    mockManagementService = {
      toggleSidenav() {},
      currentPageName$: of('')
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [
        MockManagementHeaderSidenavButtonComponent,
        MockManagementHeaderMenuComponent,
        ManagementHeaderComponent
      ],
      providers: [
        { provide: ManagementService, useValue: mockManagementService }
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
