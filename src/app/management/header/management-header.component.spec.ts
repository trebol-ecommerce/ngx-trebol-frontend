import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppUserService } from 'src/app/app-user.service';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { ManagementService } from '../management.service';
import { ManagementHeaderComponent } from './management-header.component';

describe('ManagementHeaderComponent', () => {
  let component: ManagementHeaderComponent;
  let fixture: ComponentFixture<ManagementHeaderComponent>;
  let managementService: Partial<ManagementService>;
  let appUserService: Partial<AppUserService>;

  beforeEach(async(() => {
    managementService = {
      switchSidenav() {},
      currentPageName$: of('')
    };

    appUserService = {
      closeCurrentSession() {}
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ ManagementHeaderComponent ],
      providers: [
        { provide: ManagementService, useValue: managementService },
        { provide: AppUserService, useValue: appUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
