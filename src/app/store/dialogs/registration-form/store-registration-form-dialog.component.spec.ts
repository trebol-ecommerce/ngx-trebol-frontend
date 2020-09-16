import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SharedModule } from 'src/shared/shared.module';
import { StoreRegistrationFormDialogComponent } from './store-registration-form-dialog.component';

describe('StoreRegistrationFormDialogComponent', () => {
  let component: StoreRegistrationFormDialogComponent;
  let fixture: ComponentFixture<StoreRegistrationFormDialogComponent>;
  let appService: Partial<AppService>;

  beforeEach(async(() => {
    appService = {
      register(u) { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ StoreRegistrationFormDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AppService, useValue: appService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegistrationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
