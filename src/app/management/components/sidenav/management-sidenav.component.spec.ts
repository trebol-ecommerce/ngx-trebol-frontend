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
import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization.service';
import { ManagementService } from 'src/app/management/management.service';
import { ManagementSidenavComponent } from './management-sidenav.component';

describe('ManagementSidenavComponent', () => {
  let component: ManagementSidenavComponent;
  let fixture: ComponentFixture<ManagementSidenavComponent>;
  let mockManagementService: Partial<ManagementService>;
  let mockAuthorizationService: Partial<AuthorizationService>;

  beforeEach(waitForAsync(() => {
    mockManagementService = {
      getActiveRouteSnapshotObservable() {
        return of(null);
      }
    };
    mockAuthorizationService = {
      getAuthorizedAccess() {
        return of({
          routes: []
        });
      }
    };

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
    fixture = TestBed.createComponent(ManagementSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
