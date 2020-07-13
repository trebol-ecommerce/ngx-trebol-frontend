import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormComponent } from './person-form.component';

describe('DatosPersonaFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
