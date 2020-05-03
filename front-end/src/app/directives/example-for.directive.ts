import { Directive, Input, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ygExampleFor]'
})
export class ExampleForDirective implements OnInit {

  // <span*ygExampleFor="let n em [1,2,3] usando 'txt'"></span>
  @Input('ygExampleForEm') numbers: number[];
  @Input('ygExampleForUsando') texto: string;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>) { }

  ngOnInit(): void {
    for (let number of this.numbers) {
      this.container.createEmbeddedView(this.template, { $implicit: number });
    }
  }

}
