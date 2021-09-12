// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LocalMemoryDataModule } from 'src/app/api/local-memory/data.local-memory-api.module';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';
import { of } from 'rxjs';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;
  let service: Partial<ManagementService>;

  beforeEach(waitForAsync(() => {
    service = {
      isSidenavOpen$: of(true)
    };

    TestBed.configureTestingModule({
      declarations: [ ManagementComponent ],
      imports: [ LocalMemoryDataModule ],
      providers: [
        { provide: ManagementService, useValue: service }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
