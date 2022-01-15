import { Component, OnInit } from '@angular/core';
import { TableAdminDTO } from 'src/modules/tables/models/table-admin-dto';
import { TablesService } from '../../services/tables-service/tables.service';

@Component({
  selector: 'app-tables-admin',
  templateUrl: './tables-admin.component.html',
  styleUrls: ['./tables-admin.component.scss']
})
export class TablesAdminComponent implements OnInit {

  public maxNumberOfTables : number = 12;
  public numberOfFloors : number = 3;
  public currentFloor : number = 0;

  public tables: TableAdminDTO[] = [];

  constructor(private tablesService: TablesService) { }

  ngOnInit(): void {
    this.tablesService.getAllFromFloorAdmin(0).subscribe((res) => {
          if(res != null){
            this.tables = res;
          }
    });
    this.tablesService.getFloorTablesInfo().subscribe((res) => {
      if(res != null){
        this.maxNumberOfTables = res.maxNumberOfTables;
        this.numberOfFloors = res.numberOfFloors;
      }
    });
  }

  public deleteTable(id : number) {
    this.tablesService.deleteTable(id).subscribe((res) => {
      if (res.body != null){
        for (let i = 0; i < this.tables.length; i++) {
          if (this.tables[i].id === id) {
            this.tables.splice(i, 1);
            return;
          }
        }
      }
      //todo toast za error
    }, (err) => {
      console.log("greskica kod delete stolova");
    });
  }

  public nextFloor(){
    if (this.currentFloor != this.numberOfFloors-1){
      this.currentFloor+=1;
      this.tablesService.getAllFromFloorAdmin(this.currentFloor).subscribe((res) => {
        if(res != null){
          this.tables = res;
        }
      });
    }
  }

  public previousFloor(){
    if (this.currentFloor != 0){
      this.currentFloor-=1;
      this.tablesService.getAllFromFloorAdmin(this.currentFloor).subscribe((res) => {
        if(res != null){
          this.tables = res;
        }
      });
    }
  }
}
