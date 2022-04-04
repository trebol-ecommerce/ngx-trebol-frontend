/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IEntityDataApiService } from 'src/app/api/entity.data-api.iservice';
import { EntityFormGroupFactoryService } from 'src/app/shared/entity-form-group-factory.service';
import { SellFormComponent } from './sell-form.component';
import { SellFormService } from './sell-manager-form.service';

describe('SellFormComponent', () => {
  let component: SellFormComponent;
  let fixture: ComponentFixture<SellFormComponent>;
  let mockService: Partial<SellFormService>;
  let mockDataApiService: Partial<IEntityDataApiService<any>>;
  let mockSnackBarService: Partial<MatSnackBar>;
  let mockDialogService: Partial<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockService = {
      refreshSellDetailsFrom(i) {},
      sellDetails$: of([]),
      sellNetValue$: of(0),
      sellTotalValue$: of(0),
      addProducts(p) {},
      increaseDetailProductQuantityAtIndex(i) {},
      decreaseDetailProductQuantityAtIndex(i) {},
      removeDetailAtIndex(i) {}
    };
    mockDataApiService = {
      fetchPage() {
        return of({
          items: [],
          totalCount: 0,
          pageIndex: 0,
          pageSize: 10
        });
      }
    };
    mockSnackBarService = {
      open(m: string, a: string) { return void 0; }
    };
    mockDialogService = {
      open() { return void 0; }
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule
      ],
      declarations: [ SellFormComponent ],
      providers: [
        { provide: API_INJECTION_TOKENS.dataCustomers, useValue: mockDataApiService },
        { provide: API_INJECTION_TOKENS.dataSalespeople, useValue: mockDataApiService },
        { provide: API_INJECTION_TOKENS.dataBillingTypes, useValue: mockDataApiService },
        { provide: MatSnackBar, useValue: mockSnackBarService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: MatDialogRef, useValue: {} },
        EntityFormGroupFactoryService,
        CurrencyPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(SellFormService, { useValue: mockService });
    fixture = TestBed.createComponent(SellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
