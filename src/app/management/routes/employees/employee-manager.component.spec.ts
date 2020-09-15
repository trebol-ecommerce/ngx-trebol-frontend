import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/shared/angular-material.module';
import { EmployeeManagerComponent } from './employee-manager.component';
import { EmployeeManagerService } from './employee-manager.service';

describe('EmployeeManagerComponent', () => {
  let component: EmployeeManagerComponent;
  let fixture: ComponentFixture<EmployeeManagerComponent>;
  let managerService: Partial<EmployeeManagerService>;

  beforeEach(async(() => {
    managerService = {
      removeItems() { return of([true]); },
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([])
    };

    TestBed.configureTestingModule({
      imports: [
        ...MATERIAL_MODULES
      ],
      declarations: [ EmployeeManagerComponent ],
      providers: [
        { provide: EmployeeManagerService, useValue: managerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
