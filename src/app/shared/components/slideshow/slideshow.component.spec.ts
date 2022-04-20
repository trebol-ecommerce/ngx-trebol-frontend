/*
 * Copyright (c) 2022 The Trebol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { concat, EMPTY, merge, of, timer } from 'rxjs';
import { finalize, take, takeUntil, tap, toArray } from 'rxjs/operators';
import { Image } from 'src/models/entities/Image';
import { observeIfEventFiresUponCallback } from 'src/test-functions/observeIfEventFiresUponCallback';
import { SlideshowComponent } from './slideshow.component';

@Component({
  selector: 'app-higher-order-form',
  template: '<form [formGroup]="formGroup"><app-slideshow formControlName="images"></app-slideshow></form>'
})
class MockHigherOrderFormComponent {
  @ViewChild(SlideshowComponent, { static: true }) slideshowComponent: SlideshowComponent;

  formGroup = new FormGroup({ images: new FormControl(null) });
  get images() { return this.formGroup.get('images') as FormControl; }
}

describe('SlideshowComponent', () => {
  let containerForm: MockHigherOrderFormComponent;
  let fixture: ComponentFixture<MockHigherOrderFormComponent>;
  let component: SlideshowComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule
      ],
      declarations: [
        SlideshowComponent,
        MockHigherOrderFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockHigherOrderFormComponent);
    containerForm = fixture.componentInstance;
    component = containerForm.slideshowComponent;
    component.automaticSlide = false; // testing behavior
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start without any slides loaded by itself', () => {
    expect(component.images.length).toBe(0);
  });

  it('should not fire a `navigate` event when no actual navigation is made', () => {
    observeIfEventFiresUponCallback(
      component.navigate,
      () => {
        component.onClickSlideSelector(0);
        component.onClickSlideForwards();
        component.onClickSlideBackwards();
      },
      timer(1)
    ).pipe(
      tap(didFireEvent => expect(didFireEvent).toBeFalse())
    ).subscribe();
  });

  describe('implements ControlValueAccessor', () => {
    it('should start in a valid state', () => {
      expect(containerForm.formGroup.valid).toBeTrue();
    });

    it('should accept arrays of Image as valid input', () => {
      const mockImages: Image[] = [
        { filename: 'some-filename.jpg', url: 'some/path/to/some-filename.jpg' },
        { filename: 'some-filename2.jpg', url: 'some/path/to/some-filename2.jpg' }
      ];
      containerForm.images.setValue(mockImages);
      expect(component.images).toEqual(mockImages);
    });

    it('should respond to changes in disabled state', () => {
      containerForm.formGroup.disable();
      expect(component.disabled).toBeTrue();
      containerForm.formGroup.enable();
      expect(component.disabled).toBeFalse();
    });
  });

  describe('when some slides are loaded', () => {
    beforeEach(() => {
      component.images = [
        { filename: 'some-filename.jpg', url: 'some/path/to/some-filename.jpg' },
        { filename: 'some-filename2.jpg', url: 'some/path/to/some-filename2.jpg' },
        { filename: 'some-filename3.jpg', url: 'some/path/to/some-filename3.jpg' }
      ];
      fixture.detectChanges();
    });

    it('should be in a valid state', () => {
      expect(containerForm.formGroup.valid).toBeTrue();
    });

    it('should fire a `navigate` event', () => {
      concat(
        observeIfEventFiresUponCallback(
          component.navigate,
          () => component.onClickSlideSelector(1),
          timer(1)
        ),
        observeIfEventFiresUponCallback(
          component.navigate,
          () => component.onClickSlideForwards(),
          timer(1)
        ),
        observeIfEventFiresUponCallback(
          component.navigate,
          () => component.onClickSlideBackwards(),
          timer(1)
        )
      ).pipe(
        toArray(),
        tap(results => {
          expect(results.length).toBe(3);
          expect(results[0]).toBeTrue();
          expect(results[1]).toBeTrue();
          expect(results[2]).toBeTrue();
        })
      ).subscribe();
    });

    it('should have `currentIndex$` emit the currently active slide index', () => {
      merge(
        component.currentIndex$.pipe(
          take(3)
        ),
        concat(
          EMPTY.pipe(
            finalize(() => component.onClickSlideSelector(1))
          ),
          EMPTY.pipe(
            finalize(() => component.onClickSlideSelector(0))
          )
        )
      ).pipe(
        toArray(),
        tap(results => {
          expect(results.length).toBe(3); // including initial state
          expect(results[0]).toBe(0);
          expect(results[1]).toBe(1);
          expect(results[2]).toBe(0);
        })
      ).subscribe();
    });

    it('should not fire a `navigate` event if clicking the slide that is already active', () => {
      observeIfEventFiresUponCallback(
        component.navigate,
        () => component.onClickSlideSelector(0),
        timer(1)
      ).pipe(
        tap(didFireEvent => expect(didFireEvent).toBeFalse())
      ).subscribe();
    });

    it('should jump to the previous slide when removing the active slide', () => {
      concat(
        EMPTY.pipe(
          finalize(() => {
            component.onClickSlideSelector(1);
            component.onClickRemove();
          })
        ),
        component.currentIndex$.pipe(
          take(1),
          tap(i => expect(i).toBe(0))
        )
      ).subscribe();
    });
  });

  describe('when edition is enabled', () => {
    beforeEach(() => {
      component.editable = true;
      fixture.detectChanges();
    });

    it('should fire an `add` event', () => {
      observeIfEventFiresUponCallback(
        component.add,
        () => component.onClickAdd(),
        timer(1)
      ).pipe(
        tap(didFireEvent => expect(didFireEvent).toBeTrue())
      ).subscribe();
    });

    it('should remove the active slide', () => {
      component.images = [
        { filename: 'some-filename.jpg', url: 'some/path/to/some-filename.jpg' }
      ];
      component.onClickRemove();
      expect(component.images.length).toBe(0);
    });
  });

  // TODO get these unit tests working
  xdescribe('when automatic sliding is enabled', () => {
    beforeEach(() => {
      component.images = [
        { filename: 'some-filename.jpg', url: 'some/path/to/some-filename.jpg' },
        { filename: 'some-filename2.jpg', url: 'some/path/to/some-filename2.jpg' }
      ];
      component.automaticSlide = true;
      component.automaticSlideInterval = 2;
      component.startAutoRotation();
      fixture.detectChanges();
    });

    it('should switch slides over time', () => {
      jasmine.clock().install();
      component.currentIndex$.pipe(
        take(3),
        tap(() => fixture.detectChanges()),
        takeUntil(
          timer(component.automaticSlideInterval * 2)
        ),
        toArray(),
        tap(results => {
          expect(results.length).toBe(3);
          expect(results[0]).toBe(0);
          expect(results[1]).toBe(1);
          expect(results[2]).toBe(0);
        })
      ).subscribe();
      jasmine.clock().tick(component.automaticSlideInterval * 3);
      jasmine.clock().uninstall();
    });
  });
});
