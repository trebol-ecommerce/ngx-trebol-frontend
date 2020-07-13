import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerComponent } from './client-manager.component';

describe('ClientManagerComponent', () => {
  let component: ClientManagerComponent;
  let fixture: ComponentFixture<ClientManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
