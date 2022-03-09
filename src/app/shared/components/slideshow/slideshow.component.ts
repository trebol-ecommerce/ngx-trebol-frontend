/*
 * Copyright (c) 2021 The Trébol eCommerce Project
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
      useExisting: forwardRef(() => (SlideshowComponent))
    }
  ],
  animations: [
    fadeInOut(500)
  ]
})
export class SlideshowComponent
  implements OnInit, OnDestroy, ControlValueAccessor {

  private touchedSubscriptions: Subscription[] = [];
  private valueChangesSubscriptions: Subscription[] = [];
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
    for (const sub of [
      ...this.valueChangesSubscriptions,
      ...this.touchedSubscriptions]) {
      sub.unsubscribe();
    }
    this.stopAutoRotation();
  }

  onTouched(): void {
    this.touched.emit();
  }

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.formControl.setValue(obj);
      this.images = obj;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    const sub = this.formControl.valueChanges.pipe(debounceTime(250), tap(fn)).subscribe();
    this.valueChangesSubscriptions.push(sub);
  }

  registerOnTouched(fn: () => void): void {
    const sub = merge(this.touched).pipe(tap(fn)).subscribe();
    this.touchedSubscriptions.push(sub);
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
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
  }

  private autoImageRotationObservable(): Observable<void> {
    return interval(this.autoRotationInterval).pipe(
      tap(() => { this.slideForwards(); }),
      mapTo(void 0)
    );
  }

}
