/*
 * Copyright (c) 2022 The Trebol eCommerce Project
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
  let mockService: Partial<IAboutPublicApiService>;

  beforeEach(waitForAsync(() => {
    mockService = {
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
        { provide: API_SERVICE_INJECTION_TOKENS.about, useValue: mockService }
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
