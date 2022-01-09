import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TableAdminDTO } from 'src/modules/shared/models/table-admin-dto';
import { SvgService } from '../../services/svg.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  private draggingElement: any;
  
  @Input()
  tablesList: TableAdminDTO[] = [];

  selectedTable: TableAdminDTO | undefined;

  constructor(private elementRef: ElementRef, private svgService: SvgService) {}

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    const dropzone = event.target;
    const droppedElementId = event.dataTransfer.getData('text');
    const droppedElement = document.getElementById(droppedElementId) as any;

    dropzone.appendChild(droppedElement);

    droppedElement.setAttribute('draggable', true);

    const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
    this.setPosition(droppedElement, { x: svgPoint.x, y: svgPoint.y  });
    event.preventDefault();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this.draggingElement) {
      const svgPoint = this.svgService.getSVGPoint(event, this.draggingElement);
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y  });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): void {
    if (event.target.getAttribute('draggable')) {
      console.log("pdd");
      const id = event.target.getAttribute('id');
      if (id){
        for (let table of this.tablesList){
          if (table.id.toString() === id){
            this.selectedTable = table;
            this.draggingElement = event.target;
            return;
          }
        }
      }
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any): void {
    this.draggingElement = null;
    this.selectedTable = undefined;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: any): void {
    this.draggingElement = null;
  }

  private setPosition(element: any, coord: any) {
    if (coord.x > 50){
      element.setAttribute('cx', coord.x);
      if (this.selectedTable)
        this.selectedTable.x = coord.x;
    }
    if (coord.y > 50){
      element.setAttribute('cy', coord.y);
      if (this.selectedTable)
        this.selectedTable.y = coord.y;
    }
    //console.log({'x': element.getAttribute('cx'), 'y': element.getAttribute('cy')})
  }
}
