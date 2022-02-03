/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CarrouselComponent } from 'src/app/shared/components/carrousel/carrousel.component';
import { CenteredMatProgressSpinnerComponent } from 'src/app/shared/components/centered-mat-spinner/component';
import { StaticBannerComponent } from 'src/app/shared/components/static-banner/static-banner.component';
import { StoreSearchComponent } from './store-search.component';
import { StoreSearchService } from './store-search.service';

describe('StoreSearchComponent', () => {
  let component: StoreSearchComponent;
  let fixture: ComponentFixture<StoreSearchComponent>;
  let mockCatalogService: Partial<StoreSearchService>;

  beforeEach(waitForAsync(() => {
    mockCatalogService = {
      reload() {}
    };

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule
      ],
      declarations: [
        StoreSearchComponent,
        CenteredMatProgressSpinnerComponent,
        CarrouselComponent,
        StaticBannerComponent
      ],
      providers: [
        { provide: StoreSearchService, useValue: mockCatalogService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
