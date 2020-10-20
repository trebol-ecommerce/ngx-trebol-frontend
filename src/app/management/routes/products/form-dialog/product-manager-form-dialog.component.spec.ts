// Copyright (c) 2020 Benjamin
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductManagerFormDialogComponent } from './product-manager-form-dialog.component';
import { ProductManagerFormService } from './product-manager-form.service';

describe('ProductManagerFormDialogComponent', () => {
  let component: ProductManagerFormDialogComponent;
  let fixture: ComponentFixture<ProductManagerFormDialogComponent>;
  let service: Partial<ProductManagerFormService>;

  beforeEach(async(() => {
    service = {
      saving$: of(false),
      productTypes$: of([]),
      getAllProductFamilies() { return of([]); },
      updateSelectedFamily(i) {},
      submit(i) { return of(true); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ ProductManagerFormDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.overrideProvider(ProductManagerFormService, { useValue: service });
    fixture = TestBed.createComponent(ProductManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
