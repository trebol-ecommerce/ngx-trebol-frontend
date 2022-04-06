/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization.service';
import { ManagementService } from 'src/app/management/management.service';
import { ManagementSidenavComponent } from './management-sidenav.component';

describe('ManagementSidenavComponent', () => {
  let component: ManagementSidenavComponent;
  let fixture: ComponentFixture<ManagementSidenavComponent>;
  let managementServiceSpy: jasmine.SpyObj<ManagementService>;
  let authorizationServiceSpy: jasmine.SpyObj<AuthorizationService>;

  beforeEach(waitForAsync(() => {
    const mockManagementService = jasmine.createSpyObj('ManagementService', ['getActiveRouteSnapshotObservable']);
    const mockAuthorizationService = jasmine.createSpyObj('AuthorizationService', ['getAuthorizedAccess'])

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [ ManagementSidenavComponent ],
      providers: [
        { provide: ManagementService, useValue: mockManagementService },
        { provide: AuthorizationService, useValue: mockAuthorizationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    managementServiceSpy = TestBed.inject(ManagementService) as jasmine.SpyObj<ManagementService>;
    authorizationServiceSpy = TestBed.inject(AuthorizationService) as jasmine.SpyObj<AuthorizationService>;

    fixture = TestBed.createComponent(ManagementSidenavComponent);
    component = fixture.componentInstance;
  });

  describe('always', () => {
    beforeEach(() => {
      managementServiceSpy.getActiveRouteSnapshotObservable.and.returnValue(EMPTY);
      authorizationServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: [] }));
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  // TODO finish writing this sub-suite
  xdescribe('normally', () => {
    let mockRouteSnapshot: Partial<ActivatedRouteSnapshot>;
    let mockRoutes: string[]

    beforeEach(() => {
      mockRouteSnapshot = { url: [] };
      mockRoutes = ['sales', 'products'];
      managementServiceSpy.getActiveRouteSnapshotObservable.and.returnValue(of(mockRouteSnapshot as ActivatedRouteSnapshot));
      authorizationServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: mockRoutes }));
      fixture.detectChanges();
    });
  });


});
