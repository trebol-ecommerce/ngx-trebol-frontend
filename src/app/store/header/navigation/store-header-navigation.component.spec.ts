import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreService } from '../../store.service';
import { StoreHeaderNavigationComponent } from './store-header-navigation.component';

describe('StoreHeaderNavigationComponent', () => {
  let component: StoreHeaderNavigationComponent;
  let fixture: ComponentFixture<StoreHeaderNavigationComponent>;
  let mockStoreService: Partial<StoreService>;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      cartDetails$: of([]),
      cartItemCount$: of(0),
      cartSubtotalValue$: of(0)
    };

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreHeaderNavigationComponent ],
      providers: [
        { provide: StoreService, useValue: mockStoreService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
