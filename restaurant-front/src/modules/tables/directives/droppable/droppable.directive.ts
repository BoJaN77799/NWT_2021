import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TableAdminDTO } from 'src/modules/shared/models/table-admin-dto';
import { SvgService } from '../../services/svg.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {

  //TODO - staviti da bude slika stola - ovo staviti samo konobaru

  
  
  
  //granica izmedju objekata
  //highlight sto koji se pomera


  //potencijalno error greska kad treba undo
  

  //done (srediti pri resize) - todo dodati marginu sa svih strana
  //donzo -promeniti z index da bude iznad drugih sto koji se pomera
  
  @Input()
  tablesList: TableAdminDTO[] = [];

  selectedTable : {draggingElement: any, tableDTO: TableAdminDTO, startingPosition: {x: number, y:number}, isNew: boolean} | undefined;

  constructor(private elementRef: ElementRef, private svgService: SvgService) {}

  generateID() : number {
    let maxId = 0;
    for (let table of this.tablesList){
      if (table.id > maxId){
        maxId = table.id;
      }
    }
    return maxId + 1;
  }

  // @HostListener('drop', ['$event'])
  // onDrop(event: any) {
  //   //POZIVA SE KAD SE DODA STO 

  //   //todo hardkodovan je floor, srediti
  //   let tableAdded : TableAdminDTO = {active: true, floor: 0, id: this.generateID(), x: 0, y: 0}; 
  //   let startingPositionIrrelevant = {x: 0, y: 0};
  //   //const droppedElementId = event.dataTransfer.getData('text');
  //   const droppedElement = document.getElementsByClassName('tableAdd')[0] as any;
  //   droppedElement.setAttribute('draggable', true);
  //   droppedElement.setAttribute('id', tableAdded.id.toString());

  //   this.selectedTable = {draggingElement: droppedElement, tableDTO: tableAdded, startingPosition: startingPositionIrrelevant};

  //   const svgPoint = this.svgService.getSVGPoint(event, droppedElement);
  //   this.setPositionDragDrop({ x: svgPoint.x, y: svgPoint.y  });

  //   if (this.checkForOverlapTables(this.selectedTable.tableDTO)){
  //     droppedElement.setAttribute('cx', 400);
  //     event.preventDefault();
  //     return;
  //   }

  //   this.tablesList.push(this.selectedTable.tableDTO);
  //   this.selectedTable = undefined;
  //   event.preventDefault();
  // }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: any): void {
    if (this.selectedTable) {
      const svgPoint = this.svgService.getSVGPoint(event, this.selectedTable.draggingElement);
      this.setPosition({ x: svgPoint.x, y: svgPoint.y  });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any): void {
    if (event.target.getAttribute('draggable')) {
      const tableType = event.target.getAttribute('tableType');
      if (tableType === "new"){  //dodaje se novi sto
        this.selectedTable = {
          draggingElement: event.target, 
          tableDTO: {active: true, floor: 0, id: this.generateID(),x:50, y:50}, //damo mu x i y starting pos 
          startingPosition: {x: 50, y: 50}, //todo napraviti neku konstantu da se zna starting pos za nove
          isNew: true 
        };  
        event.target.setAttribute('tableId', this.selectedTable.tableDTO.id);
        return;
      }
      const id = event.target.getAttribute('tableId');
      if (id){  //selectovan stari sto
        for (let i = 0; i < this.tablesList.length; i++){
          if (this.tablesList[i].id.toString() === id){
            this.selectedTable = {
              draggingElement: event.target, 
              tableDTO: this.tablesList[i], 
              startingPosition: {x: this.tablesList[i].x, y: this.tablesList[i].y},
              isNew: false
            };
            //stavljamo ga na kraj liste zbog renderovanja, tj da bi bio iznad drugih stolova
            let oldLastEl = this.tablesList[this.tablesList.length-1];
            this.tablesList[this.tablesList.length-1] = this.tablesList[i];
            this.tablesList[i] = oldLastEl;
            return;
          }
        }
      }
    }
  }

  checkForOverlapTables(tableDTO : TableAdminDTO) : boolean {
    for (let table of this.tablesList){
      if (table.id !== tableDTO.id){
        if (Math.abs(table.x - tableDTO.x) < 30 && Math.abs(table.y - tableDTO.y) < 30){
          return true;
        }
      }
    }
    return false;
  }

  private resetPosition() {
    if (!this.selectedTable){
      return;
    }
    this.selectedTable.tableDTO.x = this.selectedTable.startingPosition.x;
    this.selectedTable.tableDTO.y = this.selectedTable.startingPosition.y;
    this.selectedTable.draggingElement.setAttribute('cx', this.selectedTable.startingPosition.x);
    this.selectedTable.draggingElement.setAttribute('cy', this.selectedTable.startingPosition.y);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: any): void {
    if (this.selectedTable && this.checkForOverlapTables(this.selectedTable.tableDTO)){
      this.resetPosition();
    }else if (this.selectedTable?.isNew){
      if (!this.setPositionOnDrop({x: this.selectedTable.tableDTO.x, y: this.selectedTable.tableDTO.y})){
        this.resetPosition();
        this.selectedTable = undefined;
        return;
      }
      if (event.target.getAttribute('tableId') === this.selectedTable.tableDTO.id.toString()){
        event.target.remove();
        this.tablesList.push(this.selectedTable.tableDTO);
      }
    }
    this.selectedTable = undefined;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: any): void {
    if (this.selectedTable)
      this.selectedTable = undefined;
  }

  private setPositionOnDrop(coord: any) : boolean {
    if (!this.selectedTable)
      return false;
    
    if (coord.x > 140 && coord.x <= 650){ 
      this.selectedTable.draggingElement.setAttribute('cx', coord.x);
      this.selectedTable.tableDTO.x = coord.x;
    }else{
      return false;
    }
    if (coord.y >= 50 && coord.y <= 350){
      this.selectedTable.draggingElement.setAttribute('cy', coord.y);
      this.selectedTable.tableDTO.y = coord.y;
    }else{
      return false;
    }
    return true;
  }

  private setPosition(coord: any) {
    if (!this.selectedTable)
      return;
    
    if ((coord.x > 140 || this.selectedTable.isNew) && coord.x <= 650){ 
      this.selectedTable.draggingElement.setAttribute('cx', coord.x);
      this.selectedTable.tableDTO.x = coord.x;
    }
    if (coord.y >= 50 && coord.y <= 350){
      this.selectedTable.draggingElement.setAttribute('cy', coord.y);
      this.selectedTable.tableDTO.y = coord.y;
    }
  }
}
