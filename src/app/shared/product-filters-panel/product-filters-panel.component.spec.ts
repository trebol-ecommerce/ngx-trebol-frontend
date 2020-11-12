// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductFiltersPanelComponent } from './product-filters-panel.component';
import { ProductFiltersPanelService } from './product-filters-panel.service';
import { SharedModule } from '../shared.module';
import { of } from 'rxjs';

describe('ProductFiltersPanelComponent', () => {
  let component: ProductFiltersPanelComponent;
  let fixture: ComponentFixture<ProductFiltersPanelComponent>;
  let service: Partial<ProductFiltersPanelService>;

  beforeEach(waitForAsync(() => {
    service = {
      getAllProductFamilies() { return of([]); },
      getProductTypesFromFamilyId(i) { return of([]); }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ ProductFiltersPanelComponent ],
      providers: [
        { provide: ProductFiltersPanelService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFiltersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
