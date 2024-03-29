/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { AppComponent } from './app.component';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

@Component({ selector: 'app-centered-mat-spinner' })
class MockCenteredMatSpinnerComponent { }

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'router-outlet' })
class MockRouterOutletComponent { }

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let mockRouter: any;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;

  beforeEach(waitForAsync(() => {
    mockRouter = {
      events: of(new ActivationEnd({} as ActivatedRouteSnapshot))
    } as Partial<Router>;
    const mockProfileService = jasmine.createSpyObj('ProfileService', ['getUserProfile']);
    const mockSessionService = jasmine.createSpyObj('SessionService', ['validateSession']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockCenteredMatSpinnerComponent,
        MockRouterOutletComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: SessionService, useValue: mockSessionService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    profileServiceSpy = TestBed.inject(ProfileService) as jasmine.SpyObj<ProfileService>;
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    sessionServiceSpy.validateSession.and.returnValue(EMPTY);
    sessionServiceSpy.userHasActiveSession$ = of(false);
    profileServiceSpy.getUserProfile.and.returnValue(EMPTY);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('when just created', () => {
    beforeEach(() => {
      mockRouter.events = of(null);
      fixture.detectChanges();
    });

    it('should begin loading', () => {
      app.isLoading$.pipe(
        take(1),
        tap(isLoading => expect(isLoading).toBeTrue())
      ).subscribe();
    });

    it('should render a loading spinner', () => {
      const loadingSpinner = fixture.debugElement.nativeElement.querySelector('app-centered-mat-spinner');
      expect(loadingSpinner).toBeTruthy();
    });
  });

  describe('when finished loading', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render a router-outlet', () => {
      app.isLoading$.pipe(
        finalize(() => {
          const routerOutlet = fixture.debugElement.nativeElement.querySelector('router-outlet');
          expect(routerOutlet).toBeTruthy();
        })
      ).subscribe();
    });
  })
});
