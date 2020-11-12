// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Sell } from 'src/app/models/entities/Sell';
import { StoreReceiptComponent } from './store-receipt.component';
import { StoreReceiptService } from './store-receipt.service';

describe('StoreReceiptComponent', () => {
  let component: StoreReceiptComponent;
  let fixture: ComponentFixture<StoreReceiptComponent>;
  let service: Partial<StoreReceiptService>;

  beforeEach(async(() => {
    service = {
      sell$: of(new Sell()),
      loading$: of(true),
      details$: of([]),
      soldOn$: of(''),
      fetchSell() { }
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
