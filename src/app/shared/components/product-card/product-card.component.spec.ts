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
import { count, take, tap } from 'rxjs/operators';
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

  it('should fire `addToCart` when clicking in its add-product button', () => {
    component.addToCart.pipe(
      take(1),
      count(),
      tap(c => expect(c).toBe(1))
    ).subscribe();
    component.onClickAddProduct();
  });

  it('should fire `view` when clicking in its view-product button', () => {
    component.view.pipe(
      take(1),
      count(),
      tap(c => expect(c).toBe(1))
    ).subscribe();
    component.onClickViewProduct();
  });
});
