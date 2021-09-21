/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { Person } from 'src/app/models/entities/Person';
import { UserRole } from 'src/app/models/entities/UserRole';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockPeopleDataApiService: Partial<IEntityDataApiService<Person>>;
  let mockUserRolesDataApiService: Partial<IEntityDataApiService<UserRole>>;

  beforeEach(waitForAsync(() => {
    mockPeopleDataApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };
    mockUserRolesDataApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [ UserFormComponent ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.dataPeople, useValue: mockPeopleDataApiService },
        { provide: API_SERVICE_INJECTION_TOKENS.dataUserRoles, useValue: mockUserRolesDataApiService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
