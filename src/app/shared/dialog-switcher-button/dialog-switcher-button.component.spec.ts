import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogSwitcherButtonComponent } from './dialog-switcher-button.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InformationDialogComponent } from '../information-dialog/information-dialog.component';

describe('DialogSwitcherButtonComponent', () => {
  let component: DialogSwitcherButtonComponent;
  let fixture: ComponentFixture<DialogSwitcherButtonComponent>;
  let dialogService: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule
      ],
      declarations: [
        DialogSwitcherButtonComponent,
        InformationDialogComponent
      ]
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

  it('should close a dialog and open another when calling onClick()', () => {
    const dialogRef = dialogService.open(InformationDialogComponent);
    component.sourceDialogRef = dialogRef;

    const targetDialog = InformationDialogComponent;
    const targetDialogConfig = { data: { message: 'test' } };
    component.targetDialogComponent = targetDialog;
    component.targetDialogConfig = targetDialogConfig;

    const sourceDialogCloseSpy = spyOn(dialogRef, 'close').and.callThrough();
    const targetDialogOpenSpy = spyOn(dialogService, 'open').and.callThrough();
    component.onClick();
    fixture.detectChanges();
    expect(sourceDialogCloseSpy).toHaveBeenCalled();
    expect(targetDialogOpenSpy).toHaveBeenCalled();
    expect(targetDialogOpenSpy.calls.first().args[0]).toBe(targetDialog);
    expect(targetDialogOpenSpy.calls.first().args[1]).toEqual(targetDialogConfig);
  });
});
