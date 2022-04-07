/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManagementSidenavService } from 'src/app/management/components/sidenav/management-sidenav.service';
import { ManagementHeaderSidenavButtonComponent } from './management-header-sidenav-button.component';

describe('ManagementHeaderSidenavButtonComponent', () => {
  let component: ManagementHeaderSidenavButtonComponent;
  let fixture: ComponentFixture<ManagementHeaderSidenavButtonComponent>;
  let managementServiceSpy: jasmine.SpyObj<ManagementSidenavService>;

  beforeEach(waitForAsync(() => {
    const mockSidenavService = jasmine.createSpyObj('ManagementSidenavService', [ 'toggleSidenav' ]);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        ManagementHeaderSidenavButtonComponent
      ],
      providers: [
        { provide: ManagementSidenavService, useValue: mockSidenavService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    managementServiceSpy = TestBed.inject(ManagementSidenavService) as jasmine.SpyObj<ManagementSidenavService>;

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
