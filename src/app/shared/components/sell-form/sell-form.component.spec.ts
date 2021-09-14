// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SellFormComponent } from './sell-form.component';
import { SellFormService } from './sell-manager-form.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

describe('SellFormComponent', () => {
  let component: SellFormComponent;
  let fixture: ComponentFixture<SellFormComponent>;
  let service: Partial<SellFormService>;

  beforeEach(waitForAsync(() => {
    service = {
      refreshSellDetailsFrom(i) {},
      sellDetails$: of([]),
      sellSubtotalValue$: of(0),
      sellTotalValue$: of(0),
      addProducts(p) {},
      increaseDetailProductQuantityAtIndex(i) {},
      decreaseDetailProductQuantityAtIndex(i) {},
      removeDetailAtIndex(i) {}
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        AngularMaterialModule
      ],
      declarations: [ SellFormComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(SellFormService, { useValue: service });
    fixture = TestBed.createComponent(SellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
