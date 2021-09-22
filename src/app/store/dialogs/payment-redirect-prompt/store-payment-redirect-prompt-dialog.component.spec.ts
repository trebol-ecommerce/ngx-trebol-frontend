/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StoreService } from '../../store.service';
import { StorePaymentRedirectPromptDialogComponent } from './store-payment-redirect-prompt-dialog.component';

describe('StorePaymentRedirectPromptDialogComponent', () => {
  let component: StorePaymentRedirectPromptDialogComponent;
  let fixture: ComponentFixture<StorePaymentRedirectPromptDialogComponent>;
  let mockStoreService: Partial<StoreService>;
  let storeServiceRequestPaymentSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      requestPayment() { return of(void 0); }
    };
    storeServiceRequestPaymentSpy = spyOn(mockStoreService, 'requestPayment').and.callThrough();

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ StorePaymentRedirectPromptDialogComponent ],
      providers: [
        { provide: StoreService, useValue: mockStoreService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePaymentRedirectPromptDialogComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should submit the cart upon initializing', () => {
    fixture.detectChanges(); // triggers ngOnInit()
    expect(storeServiceRequestPaymentSpy).toHaveBeenCalled();
  });

  it('should render a form with a button upon a successful cart submission', () => {
    mockStoreService.requestPayment = (() => of({ url: '', token: '' }));
    fixture.detectChanges();

    const formElement = fixture.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy();
    const buttonElement = formElement.querySelector('button[type="submit"]');
    expect(buttonElement).toBeTruthy();
  });

  it('should render an error message label upon a failed cart submission', () => {
    mockStoreService.requestPayment = (() => throwError({}));
    fixture.detectChanges();

    const errorSpan = fixture.nativeElement.querySelector('span.error');
    expect(errorSpan).toBeTruthy();
  });
});
