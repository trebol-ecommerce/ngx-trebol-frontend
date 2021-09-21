/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EMPTY, of, throwError } from 'rxjs';
import { StoreService } from '../../store.service';
import { StorePaymentRedirectPromptDialogComponent } from './store-payment-redirect-prompt-dialog.component';

describe('StorePaymentRedirectPromptDialogComponent', () => {
  let component: StorePaymentRedirectPromptDialogComponent;
  let fixture: ComponentFixture<StorePaymentRedirectPromptDialogComponent>;
  let mockStoreService: Partial<StoreService>;
  let storeServiceSubmitCartSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    mockStoreService = {
      submitCart() { return EMPTY; }
    };

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
    storeServiceSubmitCartSpy = spyOn(mockStoreService, 'submitCart').and.callThrough();
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should submit the cart upon initializing', () => {
    fixture.detectChanges(); // triggers ngOnInit()
    expect(storeServiceSubmitCartSpy).toHaveBeenCalled();
  });

  it('should render a div.dialog HTML element', () => {
    fixture.detectChanges();
    const dialogDivElem: HTMLDivElement = fixture.nativeElement.querySelector('div.dialog');
    expect(dialogDivElem).toBeTruthy();
  });

  it('should render a form with a button upon a successful cart submission', () => {
    const divElem: HTMLElement = fixture.nativeElement.querySelector('div.dialog');
    mockStoreService.submitCart = (() => of({ url: '', token: '' }));
    fixture.detectChanges();

    const formElement: HTMLFormElement = divElem.querySelector('form');
    expect(formElement).toBeTruthy();
    const buttonElement: HTMLButtonElement = formElement.querySelector('button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render an error message label upon a failed cart submission', () => {
    const divElem: HTMLElement = fixture.nativeElement.querySelector('div.dialog');
    mockStoreService.submitCart = (() => throwError({}));
    fixture.detectChanges();

    const formElement: HTMLSpanElement = divElem.querySelector('span.error');
    expect(formElement).toBeTruthy();
  });
});
