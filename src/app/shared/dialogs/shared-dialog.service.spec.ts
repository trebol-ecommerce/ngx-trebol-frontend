/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { serialize } from 'v8';
import { ConfirmationDialogComponent } from './confirmation/confirmation-dialog.component';
import { ConfirmationDialogData } from './confirmation/ConfirmationDialogData';
import { SharedDialogService } from './shared-dialog.service';

describe('SharedDialogService', () => {
  let service: SharedDialogService;
  let dialogServiceSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const mockDialogService = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockDialogService },
        SharedDialogService
      ]
    });

    dialogServiceSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    dialogServiceSpy.open.and.returnValue({
      afterClosed: () => EMPTY as Observable<any>
    } as MatDialogRef<any>);
    service = TestBed.inject(SharedDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the confirmation dialog', () => {
    const payload: ConfirmationDialogData = {
      message: 'some-message',
      title: 'some-title'
    };
    service.requestConfirmation(payload).subscribe();
    expect(dialogServiceSpy.open).toHaveBeenCalled();
    expect(dialogServiceSpy.open).toHaveBeenCalledWith(
      ConfirmationDialogComponent,
      jasmine.any(Object)
    );
  });
});
