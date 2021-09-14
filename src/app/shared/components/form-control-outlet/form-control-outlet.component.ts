import { Component, OnInit, Input, Type, Injector, ComponentFactoryResolver, ViewContainerRef, forwardRef } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-control-outlet',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlOutletComponent)
    }
  ]
})
export class FormControlOutletComponent
  implements OnInit {

  @Input() type: Type<any>;

  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const component = componentRef.instance as ControlValueAccessor;
    ngControl.valueAccessor = component;
  }

}
