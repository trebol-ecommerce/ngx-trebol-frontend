import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesEditorFormComponent } from './addresses-editor-form.component';

describe('AddressesEditorFormComponent', () => {
  let component: AddressesEditorFormComponent;
  let fixture: ComponentFixture<AddressesEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesEditorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
