// Copyright (c) 2020 Benjamin La Madrid
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SellerManagerFormDialogComponent } from './seller-manager-form-dialog.component';
import { SellerManagerFormService } from './seller-manager-form.service';

describe('SellerManagerFormDialogComponent', () => {
  let component: SellerManagerFormDialogComponent;
  let fixture: ComponentFixture<SellerManagerFormDialogComponent>;
  let service: Partial<SellerManagerFormService>;

  beforeEach(async(() => {
    service = {
      submit() { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ SellerManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(SellerManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(SellerManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
