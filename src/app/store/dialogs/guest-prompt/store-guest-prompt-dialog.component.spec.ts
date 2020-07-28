import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGuestPromptDialogComponent } from './store-guest-prompt-dialog.component';

describe('StoreGuestPromptDialogComponent', () => {
  let component: StoreGuestPromptDialogComponent;
  let fixture: ComponentFixture<StoreGuestPromptDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreGuestPromptDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGuestPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
