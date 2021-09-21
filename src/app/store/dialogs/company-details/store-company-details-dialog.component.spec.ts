/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { IAboutPublicApiService } from 'src/app/api/about-public-api.iservice';
import { API_SERVICE_INJECTION_TOKENS } from 'src/app/api/api-service-injection-tokens';
import { StoreCompanyDetailsDialogComponent } from './store-company-details-dialog.component';

describe('StoreCompanyDetailsDialogComponent', () => {
  let component: StoreCompanyDetailsDialogComponent;
  let fixture: ComponentFixture<StoreCompanyDetailsDialogComponent>;
  let service: Partial<IAboutPublicApiService>;

  beforeEach(waitForAsync(() => {
    service = {
      fetchCompanyDetails() {
        return of({
          name: 'test',
          bannerImageURL: '',
          description: 'test',
          logoImageURL: ''
        });
      }
    };

    TestBed.configureTestingModule({
      declarations: [ StoreCompanyDetailsDialogComponent ],
      providers: [
        { provide: API_SERVICE_INJECTION_TOKENS.categories, useValue: service }
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
