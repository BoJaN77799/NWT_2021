import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { TableAdminDTO } from 'src/modules/tables/models/table-admin-dto';
import { SvgService } from '../../services/svg-service/svg.service';
import { TablesService } from '../../services/tables-service/tables.service';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {

  //TODO - staviti da bude slika stola - ovo staviti samo konobaru
  //TODO floor vidi nigde ga ne saljem

  
  //todo error ako nije ulogovan korisnik ili je expired token
  
  
  //highlight sto koji se pomera
  //potencijalno error greska kad treba undo
  
  
  //done (srediti pri resize) - todo dodati marginu sa svih strana
  //donzo -promeniti z index da bude iznad drugih sto koji se pomera
  //donzo - granica izmedju objekata
  
  @Input()
  tablesList: TableAdminDTO[] = [];

  selectedTable : {draggingElement: any, tableDTO: TableAdminDTO, startingPosition: {x: number, y:number}, isNew: boolean} | undefined;

  constructor(private elementRef: ElementRef, private svgService: SvgService, private tableService: TablesService) {}

  generateID() : number {
    let maxId = 0;
    for (let table of this.tablesList){
      if (table.id > maxId){
        maxId = table.id;
      }
    }
    return maxId + 1;
  }

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
          tableDTO: {active: true, floor: 0, id: this.generateID(),x:640, y:200}, //damo mu x i y starting pos 
          startingPosition: {x: 640, y: 200}, //todo napraviti neku konstantu da se zna starting pos za nove
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
        //SQRT((x0 - x1)^2 + (y0 - y1)^2) <= (R0 + R1)
        if (Math.sqrt(Math.pow((table.x - tableDTO.x), 2) + Math.pow((table.y - tableDTO.y), 2)) < 80){  //hardkodovan polupr, todo srediti
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
    if (!this.selectedTable)
      return;

    if (this.checkForOverlapTables(this.selectedTable.tableDTO)){
      this.resetPosition();
    }else if (this.selectedTable.isNew){
      if (!this.setPositionOnDrop({x: this.selectedTable.tableDTO.x, y: this.selectedTable.tableDTO.y})){
        this.resetPosition();
        this.selectedTable = undefined;
        return;
      }
      if (event.target.getAttribute('tableId') === this.selectedTable.tableDTO.id.toString()){
        event.target.remove();

        let addedTable : TableAdminDTO = this.selectedTable.tableDTO;
        addedTable.id = -1;  // kad je -1 nece se prikazati tekst, to radimo da bi sakrili id novododanog stola, 
                                              // tj prikazace se id tek kad ga dobavimo sa backenda
        this.tablesList.push(addedTable);
        this.tableService.addTable(addedTable).subscribe((res) => {
          if(res.body != null){
            addedTable.id = res.body.id;
          }
          //todo toast za error
        });
      }
    }else if (!this.selectedTable.isNew){
      this.tableService.updateTable({id: this.selectedTable.tableDTO.id, 
                                    x: this.selectedTable.tableDTO.x, 
                                    y: this.selectedTable.tableDTO.y})
                        .subscribe((res) => { }, 
                          (err) => {
                            //todo toast za error
                            console.log("greskica kod update stolova");
                          });
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
    
    if (coord.x > 20 && coord.x <= 520){ 
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
    
    if (coord.x > 50 && (coord.x <= 520 || this.selectedTable.isNew) && coord.x != this.selectedTable.tableDTO.x){ 
      this.selectedTable.draggingElement.setAttribute('cx', coord.x);
      this.selectedTable.tableDTO.x = coord.x;
    }
    if (coord.y >= 50 && coord.y <= 350 && coord.y != this.selectedTable.tableDTO.y){
      this.selectedTable.draggingElement.setAttribute('cy', coord.y);
      this.selectedTable.tableDTO.y = coord.y;
    } 
  }
}
