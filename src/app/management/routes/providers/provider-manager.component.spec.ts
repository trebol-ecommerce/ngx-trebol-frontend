import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { ProviderManagerComponent } from './provider-manager.component';
import { ProviderManagerService } from './provider-manager.service';

describe('ProviderManagerComponent', () => {
  let component: ProviderManagerComponent;
  let fixture: ComponentFixture<ProviderManagerComponent>;
  let managerService: Partial<ProviderManagerService>;

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
      declarations: [ ProviderManagerComponent ],
      providers: [
        { provide: ProviderManagerService, useValue: managerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
