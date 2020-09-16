import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreGuestShippingFormDialogComponent } from './store-guest-shipping-form-dialog.component';

describe('StoreGuestShippingFormDialogComponent', () => {
  let component: StoreGuestShippingFormDialogComponent;
  let fixture: ComponentFixture<StoreGuestShippingFormDialogComponent>;
  let appService: Partial<AppService>;

  beforeEach(async(() => {
    appService = {
      guestLogin() { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ StoreGuestShippingFormDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGuestShippingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
