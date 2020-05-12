import { Component, Input, ComponentFactoryResolver, OnChanges, Type } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'component-outlet',
  template: ''
})
export class ComponentOutletComponent implements OnChanges {
  @Input() component: Type<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainer: ViewContainerRef) { }

  ngOnChanges() {
    this.viewContainer.clear();
    if(this.component) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.viewContainer.createComponent(componentFactory);
    }
  }
}