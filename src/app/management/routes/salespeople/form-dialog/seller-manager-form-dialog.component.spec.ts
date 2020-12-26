// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalespersonManagerFormDialogComponent } from './seller-manager-form-dialog.component';
import { SalespersonManagerFormService } from './seller-manager-form.service';

describe('SalespersonManagerFormDialogComponent', () => {
  let component: SalespersonManagerFormDialogComponent;
  let fixture: ComponentFixture<SalespersonManagerFormDialogComponent>;
  let service: Partial<SalespersonManagerFormService>;

  beforeEach(waitForAsync(() => {
    service = {
      submit() { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ SalespersonManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(SalespersonManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(SalespersonManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
