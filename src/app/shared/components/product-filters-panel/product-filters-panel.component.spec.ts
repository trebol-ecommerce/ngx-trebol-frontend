/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
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
        NoopAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule
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
