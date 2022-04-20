/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { ISalesDataApiService } from 'src/app/api/sales.data.api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ManagementSalesService } from './management-sales.service';

describe('ManagementSalesService', () => {
  let service: ManagementSalesService;
  let apiServiceSpy: jasmine.SpyObj<ISalesDataApiService>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('ISalesDataApiService', ['markAsRejected', 'markAsConfirmed', 'markAsCompleted', 'fetchExisting']);
    const mockSharedDialogService = jasmine.createSpyObj('SharedDialogService', ['requestConfirmation']);

    TestBed.configureTestingModule({
      providers: [
        ManagementSalesService,
        { provide: API_INJECTION_TOKENS.dataSales, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataSales) as jasmine.SpyObj<ISalesDataApiService>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));

    service = TestBed.inject(ManagementSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch details of a single sell', () => {
    apiServiceSpy.fetchExisting.and.returnValue(EMPTY);

    service.fetch({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.fetchExisting).toHaveBeenCalled();
  })

  it('should request a confirmation before rejecting a sell', () => {
    service.markRejected({ buyOrder: 1 }).subscribe();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(apiServiceSpy.markAsRejected).not.toHaveBeenCalled();
  });

  it('should request a confirmation before confirming a sell', () => {
    service.markConfirmed({ buyOrder: 1 }).subscribe();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(apiServiceSpy.markAsConfirmed).not.toHaveBeenCalled();
  });

  it('should request a confirmation before completing a sell', () => {
    service.markComplete({ buyOrder: 1 }).subscribe();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(apiServiceSpy.markAsCompleted).not.toHaveBeenCalled();
  });

  it('should reject a sell', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    apiServiceSpy.markAsRejected.and.returnValue(EMPTY);

    service.markRejected({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.markAsRejected).toHaveBeenCalled();
  });

  it('should confirm a sell', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    apiServiceSpy.markAsConfirmed.and.returnValue(EMPTY);

    service.markConfirmed({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.markAsConfirmed).toHaveBeenCalled();
  });

  it('should complete a sell', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    apiServiceSpy.markAsCompleted.and.returnValue(EMPTY);

    service.markComplete({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.markAsCompleted).toHaveBeenCalled();
  });
});
