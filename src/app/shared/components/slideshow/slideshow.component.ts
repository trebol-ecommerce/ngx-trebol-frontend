/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Subscription, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
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

  private currentIndexSource = new BehaviorSubject(0);
  private autoRotateImagesSubscription: Subscription;

  @Input() automaticSlideInterval = 5000;
  @Input() images: Image[] = [];
  @Input() automaticSlide = true;
  @Input() editable = false;
  @Input() cycle = true;
  @Input() showSlideSelectors = true;
  @Input() showNextPreviousButtons = true;
  @Input() slideWidth = 'auto';
  @Input() slideHeight = 'auto';
  @Output() navigate = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  currentIndex$ = this.currentIndexSource.asObservable();

  disabled = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startAutoRotation();
  }

  ngOnDestroy(): void {
    this.autoRotateImagesSubscription?.unsubscribe();
    this.currentIndexSource.complete();
    this.navigate.complete();
    this.add.complete();
  }

  onChange(value: any): void { }
  onTouched(): void { }

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
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
    this.disabled = isDisabled;
  }

  onClickImage(img: Image) {
    if (img.targetUrl) {
      this.router.navigateByUrl(img.targetUrl);
    }
  }

  onClickAdd() {
    this.add.emit();
  }

  onClickRemove() {
    this.images.splice(this.currentIndexSource.value, 1);
    this.onClickSlideBackwards(true);
    this.onChange(this.images);
  }

  onClickSlideForwards() {
    if (this.images.length > 1) {
      const v = this.currentIndexSource.value;
      const isAtLastIndex = ((v + 1) >= this.images.length);
      const nextIndex = isAtLastIndex ?
        0 :
        this.cycle ?
          (v + 1) :
          undefined;

      if (nextIndex !== undefined) {
        this.navigate.emit();
        this.currentIndexSource.next(nextIndex);
      }
    }
  }

  onClickSlideBackwards(force = false) {
    if (this.images.length > 0 || force) {
      const v = this.currentIndexSource.value;
      const isOnFirstIndex = (v === 0);
      const nextIndex = !isOnFirstIndex ?
        (v - 1) :
        (this.cycle) ?
          (this.images.length - 1) :
          undefined;

      if (nextIndex !== undefined) {
        this.navigate.emit();
        this.currentIndexSource.next(nextIndex);
      }
    }
  }

  onClickSlideSelector(index: number) {
    if ((index >= 0) && (this.images.length > index) && (this.currentIndexSource.value !== index)) {
      this.navigate.emit();
      this.currentIndexSource.next(index);
      if (this.automaticSlide) {
        this.autoRotateImagesSubscription?.unsubscribe();
        this.autoRotateImagesSubscription = timer(1000).pipe(
          switchMap(() => this.autoImageRotationObservable())
        ).subscribe();
      }
    }
  }

  stopAutoRotation() {
    this.autoRotateImagesSubscription?.unsubscribe();
  }

  startAutoRotation() {
    this.stopAutoRotation();
    if (this.automaticSlide) {
      this.autoRotateImagesSubscription = this.autoImageRotationObservable().subscribe();
    }
  }

  private autoImageRotationObservable() {
    return interval(this.automaticSlideInterval).pipe(
      tap(() => this.onClickSlideForwards())
    );
  }

}
