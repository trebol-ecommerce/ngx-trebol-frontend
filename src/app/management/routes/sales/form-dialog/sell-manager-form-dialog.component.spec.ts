// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SellManagerFormDialogComponent } from './sell-manager-form-dialog.component';
import { SellManagerFormService } from './sell-manager-form.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

describe('SellManagerFormDialogComponent', () => {
  let component: SellManagerFormDialogComponent;
  let fixture: ComponentFixture<SellManagerFormDialogComponent>;
  let service: Partial<SellManagerFormService>;

  beforeEach(waitForAsync(() => {
    service = {
      saving$: of(false),
      refreshSellDetailsFromId(i) {},
      getAllSellTypes() { return of([]); },
      getAllSalespeople() { return of([]); },
      getAllCustomers() { return of([]); },
      sellDetails$: of([]),
      sellSubtotalValue$: of(0),
      sellTotalValue$: of(0),
      addProducts(p) {},
      increaseDetailProductQuantityAtIndex(i) {},
      decreaseDetailProductQuantityAtIndex(i) {},
      removeDetailAtIndex(i) {},
      submit(i) { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [ SellManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(SellManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(SellManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
