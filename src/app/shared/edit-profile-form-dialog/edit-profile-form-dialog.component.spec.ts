import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileFormDialogComponent } from './edit-profile-form-dialog.component';

describe('EditProfileFormDialogComponent', () => {
  let component: EditProfileFormDialogComponent;
  let fixture: ComponentFixture<EditProfileFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
