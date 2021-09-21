/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreHeaderMiddleComponent } from './store-header-middle.component';

describe('StoreHeaderMiddleComponent', () => {
  let component: StoreHeaderMiddleComponent;
  let fixture: ComponentFixture<StoreHeaderMiddleComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ StoreHeaderMiddleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeaderMiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
