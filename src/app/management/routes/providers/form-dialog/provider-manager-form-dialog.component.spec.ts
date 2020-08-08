import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderManagerFormDialogComponent } from './provider-manager-form-dialog.component';
import { ProviderManagerFormService } from './provider-manager-form.service';
import { of } from 'rxjs';
import { MATERIAL_MODULES } from 'src/app/shared/angular-material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
        ...MATERIAL_MODULES
      ],
      declarations: [ ProviderManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: ProviderManagerFormService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
