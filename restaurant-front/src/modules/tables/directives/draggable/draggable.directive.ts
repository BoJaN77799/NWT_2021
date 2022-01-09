import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TableAdminDTO } from 'src/modules/shared/models/table-admin-dto';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    const elementToBeDragged = event.target.getElementsByTagName('circle')[0];
    event.dataTransfer.setData('text', elementToBeDragged.id);
    console.log("ddd");
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event: any) {
      event.preventDefault();
  }
}
