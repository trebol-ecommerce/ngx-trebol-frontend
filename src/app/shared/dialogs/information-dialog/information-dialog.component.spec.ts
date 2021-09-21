/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationDialogComponent } from './information-dialog.component';

describe('InformationDialogComponent', () => {
  let component: InformationDialogComponent;
  let fixture: ComponentFixture<InformationDialogComponent>;
  let dialogData: any;

  beforeEach(waitForAsync(() => {
    dialogData = {};

    TestBed.configureTestingModule({
      declarations: [ InformationDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
