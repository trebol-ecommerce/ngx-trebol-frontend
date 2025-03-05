/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { EMPTY, of } from 'rxjs';
import { API_INJECTION_TOKENS } from 'src/app/api/api-injection-tokens';
import { IOrdersDataApiService } from 'src/app/api/orders.data.api.iservice';
import { SharedDialogService } from 'src/app/shared/dialogs/shared-dialog.service';
import { ManagementOrdersService } from './management-orders.service';

describe('ManagementOrdersService', () => {
  let service: ManagementOrdersService;
  let apiServiceSpy: jasmine.SpyObj<IOrdersDataApiService>;
  let sharedDialogServiceSpy: jasmine.SpyObj<SharedDialogService>;

  beforeEach(() => {
    const mockApiService = jasmine.createSpyObj('IOrdersDataApiService', ['markAsRejected', 'markAsConfirmed', 'markAsCompleted', 'fetchExisting']);
    const mockSharedDialogService = jasmine.createSpyObj('SharedDialogService', ['requestConfirmation']);

    TestBed.configureTestingModule({
      providers: [
        ManagementOrdersService,
        { provide: API_INJECTION_TOKENS.dataOrders, useValue: mockApiService },
        { provide: SharedDialogService, useValue: mockSharedDialogService }
      ]
    });
    apiServiceSpy = TestBed.inject(API_INJECTION_TOKENS.dataOrders) as jasmine.SpyObj<IOrdersDataApiService>;
    sharedDialogServiceSpy = TestBed.inject(SharedDialogService) as jasmine.SpyObj<SharedDialogService>;
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(false));

    service = TestBed.inject(ManagementOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch details of a single order', () => {
    apiServiceSpy.fetchExisting.and.returnValue(EMPTY);

    service.fetch({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.fetchExisting).toHaveBeenCalled();
  })

  it('should request a confirmation before rejecting a order', () => {
    service.markRejected({ buyOrder: 1 }).subscribe();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(apiServiceSpy.markAsRejected).not.toHaveBeenCalled();
  });

  it('should request a confirmation before confirming a order', () => {
    service.markConfirmed({ buyOrder: 1 }).subscribe();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(apiServiceSpy.markAsConfirmed).not.toHaveBeenCalled();
  });

  it('should request a confirmation before completing a order', () => {
    service.markComplete({ buyOrder: 1 }).subscribe();
    expect(sharedDialogServiceSpy.requestConfirmation).toHaveBeenCalled();
    expect(apiServiceSpy.markAsCompleted).not.toHaveBeenCalled();
  });

  it('should reject a order', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    apiServiceSpy.markAsRejected.and.returnValue(EMPTY);

    service.markRejected({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.markAsRejected).toHaveBeenCalled();
  });

  it('should confirm a order', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    apiServiceSpy.markAsConfirmed.and.returnValue(EMPTY);

    service.markConfirmed({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.markAsConfirmed).toHaveBeenCalled();
  });

  it('should complete a order', () => {
    sharedDialogServiceSpy.requestConfirmation.and.returnValue(of(true));
    apiServiceSpy.markAsCompleted.and.returnValue(EMPTY);

    service.markComplete({ buyOrder: 1 }).subscribe();
    expect(apiServiceSpy.markAsCompleted).toHaveBeenCalled();
  });
});
