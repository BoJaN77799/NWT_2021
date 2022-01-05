import { Component, OnInit } from '@angular/core';
import { TableAdminDTO } from 'src/modules/shared/models/table-admin-dto';
import { TablesService } from '../../services/tables.service';

@Component({
  selector: 'app-tables-admin',
  templateUrl: './tables-admin.component.html',
  styleUrls: ['./tables-admin.component.scss']
})
export class TablesAdminComponent implements OnInit {
  public tables: TableAdminDTO[] = [];

  constructor(private tablesService: TablesService) { }

  ngOnInit(): void {
    this.tablesService.getAllFromFloorAdmin(0).subscribe((res) => {
          if(res != null){
            this.tables = res;
          }
        });
  }

}
