import { ComponentFactoryResolver, Directive, Input, OnInit, Type, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGroupOwner } from 'src/app/models/FormGroupOwner';

@Directive({
  selector: '[appFormGroupOwnerOutlet]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FormGroupOwnerOutletDirective
    }
  ]
})
export class FormGroupOwnerOutletDirective
  implements OnInit {

  innerComponent: FormGroupOwner;
  @Input() componentType: Type<any> | undefined;

  constructor(
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
    }
  }

}
