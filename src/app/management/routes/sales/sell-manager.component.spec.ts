import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellManagerComponent } from './sell-manager.component';

describe('SellManagerComponent', () => {
  let component: SellManagerComponent;
  let fixture: ComponentFixture<SellManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
