import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCatalogComponent } from './store-catalog.component';

describe('StoreCatalogComponent', () => {
  let component: StoreCatalogComponent;
  let fixture: ComponentFixture<StoreCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
