import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGuestShippingFormDialogComponent } from './store-guest-shipping-form-dialog.component';
import { AppUserService } from 'src/app/app-user.service';
import { of } from 'rxjs';
import { Session } from 'src/data/models/entities/Session';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('StoreGuestShippingFormDialogComponent', () => {
  let component: StoreGuestShippingFormDialogComponent;
  let fixture: ComponentFixture<StoreGuestShippingFormDialogComponent>;
  let userService: Partial<AppUserService>;

  beforeEach(async(() => {
    userService = {
      guestLogin() { return of(new Session()); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ StoreGuestShippingFormDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AppUserService, useValue: userService }
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
