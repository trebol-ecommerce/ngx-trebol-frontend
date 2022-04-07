/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY, of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization.service';
import { ManagementRoutingService } from '../../management-routing.service';
import { ManagementSidenavComponent } from './management-sidenav.component';

describe('ManagementSidenavComponent', () => {
  let component: ManagementSidenavComponent;
  let fixture: ComponentFixture<ManagementSidenavComponent>;
  let routingServiceSpy: jasmine.SpyObj<ManagementRoutingService>;
  let authorizationServiceSpy: jasmine.SpyObj<AuthorizationService>;

  beforeEach(waitForAsync(() => {
    const mockRoutingService = jasmine.createSpyObj('ManagementRoutingService', ['currentRouteSnapshot$']);
    const mockAuthorizationService = jasmine.createSpyObj('AuthorizationService', ['getAuthorizedAccess'])

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [ ManagementSidenavComponent ],
      providers: [
        { provide: ManagementRoutingService, useValue: mockRoutingService },
        { provide: AuthorizationService, useValue: mockAuthorizationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    routingServiceSpy = TestBed.inject(ManagementRoutingService) as jasmine.SpyObj<ManagementRoutingService>;
    authorizationServiceSpy = TestBed.inject(AuthorizationService) as jasmine.SpyObj<AuthorizationService>;

    fixture = TestBed.createComponent(ManagementSidenavComponent);
    component = fixture.componentInstance;
  });

  describe('always', () => {
    beforeEach(() => {
      routingServiceSpy.currentRouteSnapshot$ = EMPTY;
      authorizationServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: [] }));
      fixture.detectChanges();
    });


    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  // TODO finish writing this sub-suite
  xdescribe('normally', () => {
    let mockRoutes: string[]

    beforeEach(() => {
      mockRoutes = ['sales', 'products'];
      authorizationServiceSpy.getAuthorizedAccess.and.returnValue(of({ routes: mockRoutes }));
      fixture.detectChanges();
    });
  });


});
