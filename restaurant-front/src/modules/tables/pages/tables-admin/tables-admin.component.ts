import { Component, OnInit } from '@angular/core';
import { TableAdminDTO } from 'src/modules/shared/models/table-admin-dto';
import { TablesService } from '../../services/tables.service';

@Component({
  selector: 'app-tables-admin',
  templateUrl: './tables-admin.component.html',
  styleUrls: ['./tables-admin.component.scss']
})
export class TablesAdminComponent implements OnInit {
  public tables: TableAdminDTO[] = [
    {"active":true, "floor":0, "id":1, "x":50, "y":60, position: {x:40, y:60}},
    {"active":true, "floor":0, "id":2, "x":80, "y":80, position: {x:70, y:70}}];

  constructor(private tablesService: TablesService) { }

  ngOnInit(): void {
    // this.tablesService.getAllFromFloorAdmin(0).subscribe((res) => {
    //       if(res != null){
    //         this.tables = res;
    //       }
    //     });
  }

  dragEnd(event: any): void {
    console.log(event);
  }

}
