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
import { ManagementRoutingService } from '../../management-routing.service';
import { ManagementHeaderComponent } from './management-header.component';

@Component({ selector: 'app-management-header-sidenav-button' })
class MockManagementHeaderSidenavButtonComponent { }

@Component({ selector: 'app-header-brand' })
class MockHeaderBrandComponent { }

@Component({ selector: 'app-management-header-menu' })
class MockManagementHeaderMenuComponent { }

describe('ManagementHeaderComponent', () => {
  let component: ManagementHeaderComponent;
  let fixture: ComponentFixture<ManagementHeaderComponent>;
  let routingServiceSpy: jasmine.SpyObj<ManagementRoutingService>;

  beforeEach(waitForAsync(() => {
    const mockRoutingService = jasmine.createSpyObj('ManagementRoutingService', ['currentPageName$']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [
        MockManagementHeaderSidenavButtonComponent,
        MockHeaderBrandComponent,
        MockManagementHeaderMenuComponent,
        ManagementHeaderComponent
      ],
      providers: [
        { provide: ManagementRoutingService, useValue: mockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    routingServiceSpy = TestBed.inject(ManagementRoutingService) as jasmine.SpyObj<ManagementRoutingService>;
    fixture = TestBed.createComponent(ManagementHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    routingServiceSpy.currentPageName$ = of('');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
