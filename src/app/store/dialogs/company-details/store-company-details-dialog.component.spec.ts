// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-tokens';
import { SharedDataIService } from 'src/app/api/data-mgt/shared.data.iservice';
import { StoreCompanyDetailsDialogComponent } from './store-company-details-dialog.component';

describe('StoreCompanyDetailsDialogComponent', () => {
  let component: StoreCompanyDetailsDialogComponent;
  let fixture: ComponentFixture<StoreCompanyDetailsDialogComponent>;
  let service: Partial<SharedDataIService>;

  beforeEach(async(() => {
    service = {
      readCompanyDetails() { return of({ name: 'test', bannerImageURL: '', description: 'test', logoImageURL: '' }); }
    };

    TestBed.configureTestingModule({
      declarations: [ StoreCompanyDetailsDialogComponent ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.shared, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCompanyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
