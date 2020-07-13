import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderManagerFormDialogComponent } from './provider-manager-form-dialog.component';

describe('ProviderManagerFormDialogComponent', () => {
  let component: ProviderManagerFormDialogComponent;
  let fixture: ComponentFixture<ProviderManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderManagerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
