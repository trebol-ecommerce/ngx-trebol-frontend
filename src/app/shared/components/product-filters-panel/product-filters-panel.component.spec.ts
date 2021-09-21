/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFiltersPanelComponent } from './product-filters-panel.component';
import { ProductFiltersPanelService } from './product-filters-panel.service';

describe('ProductFiltersPanelComponent', () => {
  let component: ProductFiltersPanelComponent;
  let fixture: ComponentFixture<ProductFiltersPanelComponent>;
  let service: Partial<ProductFiltersPanelService>;

  beforeEach(waitForAsync(() => {
    service = {
      getRootProductCategories() { return of([]); },
      getChildrenProductCategoryByParentCode(i) { return of([]); }
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
