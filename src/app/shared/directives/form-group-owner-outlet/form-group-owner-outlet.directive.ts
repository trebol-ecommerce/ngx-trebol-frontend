import { ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef, Injector, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, ControlValueAccessor } from '@angular/forms';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';

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
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.createInnerComponent();
  }

  private createInnerComponent(): void {
    if (this.componentType) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.innerComponent = componentRef.instance;

      this.injector.get(NgControl).valueAccessor = this.innerComponent as any;
    }
  }

}
