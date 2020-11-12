// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { UserManagerComponent } from './user-manager.component';
import { UserManagerService } from './user-manager.service';

describe('UserManagerComponent', () => {
  let component: UserManagerComponent;
  let fixture: ComponentFixture<UserManagerComponent>;
  let managerService: Partial<UserManagerService>;

  beforeEach(waitForAsync(() => {
    managerService = {
      removeItems() { return of([true]); },
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      canEdit$: of(true),
      canAdd$: of(true),
      canDelete$: of(true),
      updateAccess(acc) {}
    };

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        RouterTestingModule
      ],
      declarations: [ UserManagerComponent ],
      providers: [
        { provide: UserManagerService, useValue: managerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
