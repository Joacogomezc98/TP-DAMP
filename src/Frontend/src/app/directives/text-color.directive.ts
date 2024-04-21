import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTextColor]',
  standalone: true
})
export class TextColorDirective {

  @Input('appTextColor') condition!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.condition) {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'rgb(66, 140, 255');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    }
  }

}
