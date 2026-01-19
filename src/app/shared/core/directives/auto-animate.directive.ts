import { Directive, ElementRef, inject, input } from '@angular/core';
import autoAnimate from '@formkit/auto-animate';

@Directive({
  selector: '[autoAnimate]',
  standalone: true,
})
export class AutoAnimateDirective {
  private readonly el = inject(ElementRef);

  // Duration in ms (default 250, use higher value to see animation clearly)
  readonly duration = input(500);

  constructor() {
    // Use setTimeout to allow input to be set
    setTimeout(() => {
      autoAnimate(this.el.nativeElement, {
        duration: this.duration(),
        easing: 'ease-in-out',
      });
    });
  }
}
