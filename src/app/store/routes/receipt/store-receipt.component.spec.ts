import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReceiptComponent } from './store-receipt.component';
import { StoreReceiptService } from './store-receipt.service';

describe('StoreReceiptComponent', () => {
  let component: StoreReceiptComponent;
  let fixture: ComponentFixture<StoreReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreReceiptComponent ],
      providers: [ StoreReceiptService ]
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
