import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellManagerFormDialogComponent } from './sell-manager-form-dialog.component';

describe('SellManagerFormDialogComponent', () => {
  let component: SellManagerFormDialogComponent;
  let fixture: ComponentFixture<SellManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellManagerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
