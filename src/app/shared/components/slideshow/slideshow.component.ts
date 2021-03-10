/**
 * Copyright (c) 2021 Benjamin La Madrid
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { delay, tap, mapTo } from 'rxjs/operators';
import { fadeInOut } from 'src/animations/fadeInOut';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
  animations: [
    fadeInOut(500)
  ]
})
export class SlideshowComponent
  implements OnInit, OnDestroy {

  private currentIndex = 0;
  private currentIndexSource = new BehaviorSubject(this.currentIndex);
  private autoRotateImagesSubscription: Subscription;
  private autoRotationInterval = 5000;

  @Input() @Output() imageUrls = [];
  @Input() autocycle = true;
  @Input() editable = false;
  @Output() navigate = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();
  currentIndex$ = this.currentIndexSource.asObservable();

  @ViewChildren('slideWrapper') slideWrappers: QueryList<ElementRef<HTMLImageElement>>;

  constructor() { }

  ngOnInit(): void {
    if (this.autocycle) {
      this.autoRotateImagesSubscription = this.autoImageRotationObservable().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoRotation();
  }

  private autoImageRotationObservable(): Observable<void> {
    return interval(this.autoRotationInterval).pipe(
      tap(() => { this.slideForwards(); }),
      mapTo(void 0)
    );
  }

  slideForwards(): void {
    if (this.imageUrls.length - 1 > this.currentIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.navigate.emit();
    this.currentIndexSource.next(this.currentIndex);
  }

  slideBackwards(): void {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.imageUrls.length - 1;
    }
    this.navigate.emit();
    this.currentIndexSource.next(this.currentIndex);
  }

  goToSlide(index: number): void {
    if (index >= 0 && this.imageUrls.length > index && this.currentIndex !== index) {
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
    this.imageUrls.splice(this.currentIndex, 1);
    this.slideBackwards();
  }

}
