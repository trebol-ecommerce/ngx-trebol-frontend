/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ManagementComponent } from './management.component';
import { ManagementSidenavService } from './components/sidenav/management-sidenav.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionService } from '../session.service';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'router-outlet' })
class MockRouterOutletComponent { }

@Component({ selector: 'app-management-header' })
class MockHeaderComponent { }

@Component({ selector: 'app-management-sidenav' })
class MockSidenavContentComponent { }

@Component({ selector: 'app-management-footer' })
class MockFooterComponent { }

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;
  let mockSessionService: Partial<SessionService>;
  let mockSidenavService: Partial<ManagementSidenavService>;

  beforeEach(waitForAsync(() => {
    // TODO use jasmine.SpyObj
    mockSessionService = {};
    mockSidenavService = { };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatSidenavModule
      ],
      declarations: [
        ManagementComponent,
        MockRouterOutletComponent,
        MockHeaderComponent,
        MockSidenavContentComponent,
        MockFooterComponent
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: ManagementSidenavService, useValue: mockSidenavService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockSessionService.userHasActiveSession$ = of(true); // TODO should use some form of Subject
    mockSidenavService.isSidenavOpen$ = of(true);

    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
