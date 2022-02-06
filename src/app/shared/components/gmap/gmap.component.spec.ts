/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TrustedResourceUrlPipe } from 'src/app/shared/pipes/trusted-resource-url/trusted-resource-url.pipe';
import { StoreFrontpageService } from 'src/app/store/routes/frontpage/store-frontpage.service';
import { GmapComponent } from './gmap.component';

describe('GmapComponent', () => {
  let component: GmapComponent;
  let fixture: ComponentFixture<GmapComponent>;
  let mockStoreFrontpageService: Partial<StoreFrontpageService>;

  beforeEach(waitForAsync(() => {
    mockStoreFrontpageService = {
      GOOGLE_MAPS_ID: ''
    };

    TestBed.configureTestingModule({
      declarations: [
        GmapComponent,
        TrustedResourceUrlPipe
      ],
      providers: [
        { provide: StoreFrontpageService, useValue: mockStoreFrontpageService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
