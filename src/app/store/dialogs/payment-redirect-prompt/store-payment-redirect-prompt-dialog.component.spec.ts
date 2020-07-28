import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePaymentRedirectPromptDialogComponent } from './store-payment-redirect-prompt-dialog.component';

describe('StorePaymentRedirectPromptDialogComponent', () => {
  let component: StorePaymentRedirectPromptDialogComponent;
  let fixture: ComponentFixture<StorePaymentRedirectPromptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePaymentRedirectPromptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePaymentRedirectPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
