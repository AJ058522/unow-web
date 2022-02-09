import { stringify } from '@angular/compiler/src/util';
import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appUserStatus]'
})
export class UserStatusDirective {

  @Input() status: number;

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {


    const addClass = this.getStatus(this.status);
    this.elementRef.nativeElement.classList.add(addClass);
  }

  getStatus(status: number): string{

    let addClass: string;

    switch(status){
      case 1:
        addClass = 'bg-primary';
      break;

      case 2:
        addClass = 'bg-danger';
      break;
    }
    return addClass;
  }

}
