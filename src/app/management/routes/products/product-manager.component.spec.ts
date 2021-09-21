/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ProductManagerComponent } from './product-manager.component';
import { ProductManagerService } from './product-manager.service';

describe('ProductManagerComponent', () => {
  let component: ProductManagerComponent;
  let fixture: ComponentFixture<ProductManagerComponent>;
  let managerService: Partial<ProductManagerService>;

  beforeEach(waitForAsync(() => {
    managerService = {
      removeItems() { return of([true]); },
      reloadItems() {},
      loading$: of(false),
      focusedItems$: of([]),
      items$: of([]),
      canEdit$: of(true),
      canAdd$: of(true),
      canDelete$: of(true),
      updateAccess(acc) {}
    };

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        RouterTestingModule
      ],
      declarations: [ ProductManagerComponent ],
      providers: [
        { provide: ProductManagerService, useValue: managerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
