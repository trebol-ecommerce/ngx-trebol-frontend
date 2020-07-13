import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerFormDialogComponent } from './client-manager-form-dialog.component';

describe('ClientManagerFormDialogComponent', () => {
  let component: ClientManagerFormDialogComponent;
  let fixture: ComponentFixture<ClientManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientManagerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
