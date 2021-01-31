import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogSwitcherButtonComponent } from './dialog-switcher-button.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

describe('DialogSwitcherButtonComponent', () => {
  let component: DialogSwitcherButtonComponent;
  let fixture: ComponentFixture<DialogSwitcherButtonComponent>;
  let dialogService: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [ DialogSwitcherButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSwitcherButtonComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
