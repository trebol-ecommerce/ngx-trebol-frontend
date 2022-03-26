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
import { ManagementService } from './management.service';

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
  let mockService: Partial<ManagementService>;

  beforeEach(waitForAsync(() => {
    mockService = {
      isSidenavOpen$: of(true)
    };

    TestBed.configureTestingModule({
      imports: [
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
        { provide: ManagementService, useValue: mockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
