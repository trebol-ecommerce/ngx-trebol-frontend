/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, delay, mapTo, tap } from 'rxjs/operators';
import { fadeInOut } from 'src/animations/fadeInOut';
import { Image } from 'src/models/entities/Image';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SlideshowComponent
    }
  ],
  animations: [
    fadeInOut(500)
  ]
})
export class SlideshowComponent
  implements OnInit, OnDestroy, ControlValueAccessor {

  private currentIndex = 0;
  private currentIndexSource = new BehaviorSubject(this.currentIndex);
  private autoRotateImagesSubscription: Subscription;
  private autoRotationInterval = 5000;

  @Input() images: Image[] = [];
  @Input() autocycle = true;
  @Input() editable = false;
  @Input() showSlideSelectors = true;
  @Input() showNextPreviousButtons = true;
  @Input() slideWidth = 'auto';
  @Input() slideHeight = 'auto';
  @Output() navigate = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();
  @Output() touched = new EventEmitter<void>();
  currentIndex$ = this.currentIndexSource.asObservable();

  formControl = new FormControl();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.autocycle) {
      this.autoRotateImagesSubscription = this.autoImageRotationObservable().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  onChange(value: any): void { }
  onTouched(): void { }

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.formControl.setValue(obj);
      this.images = obj;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  onClickImage(img: Image) {
    if (img.targetUrl) {
      this.router.navigateByUrl(img.targetUrl);
    }
  }

  slideForwards(): void {
    if (this.images.length - 1 > this.currentIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.navigate.emit();
    this.currentIndexSource.next(this.currentIndex);
  }

  slideBackwards(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
    this.navigate.emit();
    this.currentIndexSource.next(this.currentIndex);
  }

  goToSlide(index: number): void {
    if (index >= 0 && this.images.length > index && this.currentIndex !== index) {
      this.currentIndex = index;
      this.navigate.emit();
      this.currentIndexSource.next(this.currentIndex);
      if (this.autocycle) {
        this.stopAutoRotation();
        this.autoRotateImagesSubscription = this.autoImageRotationObservable().pipe(
          delay(1000)
        ).subscribe();
      }
    }
  }

  stopAutoRotation(): void {
    if (!!this.autoRotateImagesSubscription) {
      this.autoRotateImagesSubscription.unsubscribe();
    }
  }

  startAutoRotation(): void {
    this.stopAutoRotation();
    if (this.autocycle) {
      this.autoRotateImagesSubscription = this.autoImageRotationObservable().subscribe();
    }
  }

  onClickAdd(): void {
    this.add.emit();
  }

  onClickRemove(): void {
    this.images.splice(this.currentIndex, 1);
    this.slideBackwards();
    this.onChange(this.images);
  }

  private autoImageRotationObservable(): Observable<void> {
    return interval(this.autoRotationInterval).pipe(
      tap(() => { this.slideForwards(); }),
      mapTo(void 0)
    );
  }

}
