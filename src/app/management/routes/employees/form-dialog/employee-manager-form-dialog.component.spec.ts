import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { EmployeeManagerFormDialogComponent } from './employee-manager-form-dialog.component';
import { EmployeeManagerFormService } from './employee-manager-form.service';

describe('EmployeeManagerFormDialogComponent', () => {
  let component: EmployeeManagerFormDialogComponent;
  let fixture: ComponentFixture<EmployeeManagerFormDialogComponent>;
  let service: Partial<EmployeeManagerFormService>;

  beforeEach(async(() => {
    service = {
      getAllEmployeeRoles() { return of([]); },
      submit() { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ...MATERIAL_MODULES
      ],
      declarations: [ EmployeeManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: EmployeeManagerFormService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
