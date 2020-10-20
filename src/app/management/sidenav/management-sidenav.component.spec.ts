// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ManagementService } from '../management.service';
import { ManagementSidenavComponent } from './management-sidenav.component';


describe('ManagementSidenavComponent', () => {
  let component: ManagementSidenavComponent;
  let fixture: ComponentFixture<ManagementSidenavComponent>;
  let managementService: Partial<ManagementService>;

  beforeEach(async(() => {
    managementService = {
      activeRouteSnapshot$: of(null)
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ManagementSidenavComponent ],
      providers: [
        { provide: ManagementService, useValue: managementService }
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
