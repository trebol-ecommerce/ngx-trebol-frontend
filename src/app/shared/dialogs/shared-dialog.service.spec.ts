/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedDialogService } from './shared-dialog.service';

describe('SharedDialogService', () => {
  let service: SharedDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      providers: [
        SharedDialogService
      ]
    });
    service = TestBed.inject(SharedDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
