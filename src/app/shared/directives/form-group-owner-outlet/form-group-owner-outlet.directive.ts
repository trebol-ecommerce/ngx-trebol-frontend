/*
 * Copyright (c) 2021 The Trébol eCommerce Project
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Directive, forwardRef, Injector, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGroupOwner } from 'src/models/FormGroupOwner';

@Directive({
  selector: '[appFormGroupOwnerOutlet]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormGroupOwnerOutletDirective)
    }
  ]
})
export class FormGroupOwnerOutletDirective
  implements OnInit {

  innerComponent: FormGroupOwner;
  @Input() componentType: Type<any> | undefined;

  constructor(
    private injector: Injector,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.createInnerComponent();
  }

  private createInnerComponent(): void {
    if (this.componentType) {
      const componentRef = this.viewContainerRef.createComponent(this.componentType);
      this.innerComponent = componentRef.instance;
      this.injector.get(NgControl).valueAccessor = this.innerComponent as any;
    }
  }

}
