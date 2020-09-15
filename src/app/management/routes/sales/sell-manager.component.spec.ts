import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/shared/angular-material.module';
import { SellManagerComponent } from './sell-manager.component';
import { SellManagerService } from './sell-manager.service';

describe('SellManagerComponent', () => {
  let component: SellManagerComponent;
  let fixture: ComponentFixture<SellManagerComponent>;
  let managerService: Partial<SellManagerService>;

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
      declarations: [ SellManagerComponent ],
      providers: [
        { provide: SellManagerService, useValue: managerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
