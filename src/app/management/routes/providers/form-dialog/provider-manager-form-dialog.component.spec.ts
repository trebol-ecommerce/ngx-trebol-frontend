import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProviderManagerFormDialogComponent } from './provider-manager-form-dialog.component';
import { ProviderManagerFormService } from './provider-manager-form.service';

describe('ProviderManagerFormDialogComponent', () => {
  let component: ProviderManagerFormDialogComponent;
  let fixture: ComponentFixture<ProviderManagerFormDialogComponent>;
  let service: Partial<ProviderManagerFormService>;

  beforeEach(async(() => {
    service = {
      saving$: of(false),
      submit(i) { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ ProviderManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(ProviderManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(ProviderManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
