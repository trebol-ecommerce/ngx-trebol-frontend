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
import { SessionService } from 'src/app/session.service';
import { ManagementRoutingService } from '../../management-routing.service';
import { ManagementSidenavComponent } from './management-sidenav.component';

describe('ManagementSidenavComponent', () => {
  let component: ManagementSidenavComponent;
  let fixture: ComponentFixture<ManagementSidenavComponent>;
  let routingServiceSpy: jasmine.SpyObj<ManagementRoutingService>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(waitForAsync(() => {
    const mockRoutingService = jasmine.createSpyObj('ManagementRoutingService', ['currentRouteSnapshot$']);
    const mockSessionService = jasmine.createSpyObj('SessionService', ['fetchAuthorizedAccess'])

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [ ManagementSidenavComponent ],
      providers: [
        { provide: ManagementRoutingService, useValue: mockRoutingService },
        { provide: SessionService, useValue: mockSessionService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    routingServiceSpy = TestBed.inject(ManagementRoutingService) as jasmine.SpyObj<ManagementRoutingService>;
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;

    fixture = TestBed.createComponent(ManagementSidenavComponent);
    component = fixture.componentInstance;
  });

  describe('always', () => {
    beforeEach(() => {
      routingServiceSpy.currentRouteSnapshot$ = EMPTY;
      sessionServiceSpy.fetchAuthorizedAccess.and.returnValue(of({ routes: [] }));
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
      sessionServiceSpy.fetchAuthorizedAccess.and.returnValue(of({ routes: mockRoutes }));
      fixture.detectChanges();
    });
  });


});
