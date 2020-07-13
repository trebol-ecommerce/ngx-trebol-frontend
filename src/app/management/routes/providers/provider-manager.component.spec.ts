import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderManagerComponent } from './provider-manager.component';

describe('ProviderManagerComponent', () => {
  let component: ProviderManagerComponent;
  let fixture: ComponentFixture<ProviderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
