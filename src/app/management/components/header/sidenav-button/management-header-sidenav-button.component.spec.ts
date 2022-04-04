/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManagementService } from 'src/app/management/management.service';
import { ManagementHeaderSidenavButtonComponent } from './management-header-sidenav-button.component';

describe('ManagementHeaderSidenavButtonComponent', () => {
  let component: ManagementHeaderSidenavButtonComponent;
  let fixture: ComponentFixture<ManagementHeaderSidenavButtonComponent>;
  let managementServiceSpy: jasmine.SpyObj<ManagementService>;

  beforeEach(waitForAsync(() => {
    const mockManagementService = jasmine.createSpyObj('ManagementService', [ 'toggleSidenav', 'currentPageName$' ]);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        ManagementHeaderSidenavButtonComponent
      ],
      providers: [
        { provide: ManagementService, useValue: mockManagementService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    managementServiceSpy = TestBed.inject(ManagementService) as jasmine.SpyObj<ManagementService>;

    fixture = TestBed.createComponent(ManagementHeaderSidenavButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service toggle method', () => {
    component.toggle();
    expect(managementServiceSpy.toggleSidenav).toHaveBeenCalled();
  });
});
