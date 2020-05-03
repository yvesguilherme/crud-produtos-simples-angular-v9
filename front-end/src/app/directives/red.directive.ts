import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ygRed]'
})
export class RedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#e35e6b';
  }

}
