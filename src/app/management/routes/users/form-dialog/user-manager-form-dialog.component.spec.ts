import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerFormDialogComponent } from './user-manager-form-dialog.component';

describe('UserManagerFormDialogComponent', () => {
  let component: UserManagerFormDialogComponent;
  let fixture: ComponentFixture<UserManagerFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagerFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
