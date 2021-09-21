import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddressesEditorFormComponent } from './store-addresses-editor-form.component';

describe('StoreAddressesEditorFormComponent', () => {
  let component: StoreAddressesEditorFormComponent;
  let fixture: ComponentFixture<StoreAddressesEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAddressesEditorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAddressesEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
