// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StoreReceiptComponent } from './store-receipt.component';
import { StoreReceiptService } from './store-receipt.service';
import { Receipt } from 'src/app/models/Receipt';

describe('StoreReceiptComponent', () => {
  let component: StoreReceiptComponent;
  let fixture: ComponentFixture<StoreReceiptComponent>;
  let service: Partial<StoreReceiptService>;

  beforeEach(waitForAsync(() => {
    service = {
      receipt$: of(new Receipt()),
      loading$: of(true),
      details$: of([]),
      date$: of(''),
      fetchReceipt() { }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ StoreReceiptComponent ],
      providers: [
        { provide: StoreReceiptService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
