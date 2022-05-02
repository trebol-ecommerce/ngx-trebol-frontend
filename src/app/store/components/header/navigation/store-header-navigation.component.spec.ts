/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreCartService } from 'src/app/store/store-cart.service';
import { StoreHeaderNavigationComponent } from './store-header-navigation.component';

describe('StoreHeaderNavigationComponent', () => {
  let component: StoreHeaderNavigationComponent;
  let fixture: ComponentFixture<StoreHeaderNavigationComponent>;
  let mockCartService: Partial<StoreCartService>;

  beforeEach(waitForAsync(() => {
    // TODO use jasmine.SpyObj
    mockCartService = {
      cartDetails$: of([]),
      cartItemCount$: of(0),
      cartNetValue$: of(0)
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ StoreHeaderNavigationComponent ],
      providers: [
        { provide: StoreCartService, useValue: mockCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
