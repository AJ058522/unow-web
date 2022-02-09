import { Directive, Input, ElementRef, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
import { Sort } from '../classes/sort/sort';

interface SortStatus {
  order: string,
  property: string
}

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;
  @Output() sortState = new EventEmitter<SortStatus>();

  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  @HostListener("click")
  sortData() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute("data-order");
    const property = elem.getAttribute("data-name");

    if (order === "desc") {
      this.sortState.emit({order: 'asc', property: property});
      elem.setAttribute("data-order", "asc");
      this.clearIcons(this.targetElem.nativeElement.parentNode);
      this.targetElem.nativeElement.innerHTML = this.addIcon(this.targetElem.nativeElement.innerHTML, 'asc');
    } else {
      this.sortState.emit({order: 'desc', property: property});
      elem.setAttribute("data-order", "desc");
      this.clearIcons(this.targetElem.nativeElement.parentNode);
      this.targetElem.nativeElement.innerHTML = this.addIcon(this.targetElem.nativeElement.innerHTML, 'desc');
    }
  }

  addIcon(characters: string, order: string): string {

    let response: string[];
    response = characters.split('<i');

    if (order === "desc") {
      response[0] += '<i class="ft-chevron-down font-medium-2 blue-grey darken-4"></i>';
    }else {
      response[0] += '<i class="ft-chevron-up font-medium-2 blue-grey darken-4"></i>';
    }
    return response[0];
    return characters;
  }

  clearIcons(parent){
    let children: Array<HTMLElement> = Array.from(parent.children);
    children.forEach(element => {
      let response: string[];
      response = element.innerHTML.split('<i');
      element.innerHTML = response[0];
    });
  }

}
