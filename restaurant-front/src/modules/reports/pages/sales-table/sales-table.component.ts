import {Component} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 12, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 13, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 14, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 15, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 16, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent implements AfterViewInit{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
 // dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
