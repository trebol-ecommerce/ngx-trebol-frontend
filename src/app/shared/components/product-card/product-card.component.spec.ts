/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [ ProductCardComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire an `addToCart` event', () => {
    observeIfEventFiresUponCallback(
      component.addToCart,
      () => component.onClickAddProduct()
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });

  it('should fire a `view` event', () => {
    observeIfEventFiresUponCallback(
      component.view,
      () => component.onClickViewProduct()
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeTrue())
    ).subscribe();
  });
});
