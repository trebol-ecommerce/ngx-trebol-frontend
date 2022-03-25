/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent
    },
    {
      provide: MatFormFieldControl,
      multi: true,
      useExisting: FileUploadComponent
    }
  ]
})
export class FileUploadComponent
  implements OnInit, AfterViewInit, OnDestroy, MatFormFieldControl<FileList>, ControlValueAccessor {

  static nextId = 0;

  private innerFileList: FileList;
  private innerPlaceholder: string;
  private fileListSource = new ReplaySubject<FileList>();
  private stateChangesSource = new Subject<void>();
  private innerFocused: boolean;
  private innerRequired: boolean;
  private innerDisabled: boolean;
  private onChange: (obj: any) => any;
  private onTouched: () => void;

  stateChanges = this.stateChangesSource.asObservable();
  controlType = 'file-upload';
  autofilled = false;
  userAriaDescribedBy?: string;
  ngControl: NgControl;

  @HostBinding()
  id = `app-file-upload-${FileUploadComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat(): boolean {
    return (this.focused || !this.empty);
  }

  @Input()
  get value(): FileList {
    return this.innerFileList;
  }
  set value(value: FileList) {
    this.innerFileList = value;
    this.fileListSource.next(value);
    this.stateChangesSource.next();
  }

  @Input()
  get placeholder(): string {
    return this.innerPlaceholder;
  }
  set placeholder(value: string) {
    this.innerPlaceholder = value;
    this.stateChangesSource.next();
  }

  @Input()
  get required(): boolean {
    return this.innerRequired;
  }
  set required(value: boolean) {
    this.innerRequired = value;
    this.stateChangesSource.next();
  }

  @Input()
  get disabled(): boolean {
    return this.innerDisabled;
  }
  set disabled(value: boolean) {
    this.innerDisabled = value;
    this.stateChangesSource.next();
  }

  get focused(): boolean {
    return this.innerFocused;
  }
  set focused(value: boolean) {
    this.innerFocused = value;
    this.stateChangesSource.next();
  }

  get empty(): boolean {
    return (this.innerFileList?.length === 0);
  }

  get errorState(): boolean {
    return JSON.stringify(this.ngControl?.errors || {}) !== '{}';
  }

  @Input() multiple = true;
  fileNames$: Observable<string>;

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

  constructor(
    @Optional() @Self() ngControl: NgControl,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    private changeDetector: ChangeDetectorRef
  ) {
    if (ngControl != null) {
      this.ngControl = ngControl;
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.fileNames$ = this.fileListSource.asObservable().pipe(
      map(
        fileList => {
          if (fileList?.length > 0) {
            if (this.multiple) {
              const count = fileList.length;
              const sIf = (count !== 1 ? 's' : '');
              const fileCountText = `${count} archivo${sIf}`;
              const names = [fileCountText, ''];
              for (let i = 0; i < count; i++) {
                const fileName = fileList.item(i).name;
                names.push(fileName);
              }
              return names.join('\r\n');
            } else {
              return fileList.item(0).name;
            }
          } else {
            return '';
          }
        }
      )
    );
  }

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.elementRef.nativeElement, false).subscribe(
      elem => {
        this.focused = !!elem;
      }
    );
  }

  ngOnDestroy(): void {
    this.fileListSource.complete();
    this.stateChangesSource.complete();
    this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
  }

  setDescribedByIds(ids: string[]): void {
    this.fileInput.nativeElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent): void {
    this.fileInput.nativeElement.focus();
    this.onFileInputFocus();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.stateChangesSource.next();
  }

  onFileInputChange(): void {
    this.innerFileList = this.fileInput.nativeElement.files;
    this.fileListSource.next(this.innerFileList);
    this.changeDetector.detectChanges();
    this.onChange(this.innerFileList);
    this.stateChangesSource.next();
  }

  onFileInputFocus(): void {
    this.fileInput.nativeElement.click();
    this.onTouched();
  }

}
