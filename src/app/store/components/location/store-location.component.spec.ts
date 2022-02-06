/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreLocationComponent } from './store-location.component';

describe('StoreLocationComponent', () => {
  let component: StoreLocationComponent;
  let fixture: ComponentFixture<StoreLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
