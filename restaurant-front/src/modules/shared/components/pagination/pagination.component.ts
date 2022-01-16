import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { UtilService } from "../../services/util/util.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalItems: number;
  @Input() pageSize: number;
  @Output() pageSelected: EventEmitter<number>;
  pages: number[];
  activePage: number;

  constructor(private utilService: UtilService) {
    this.totalItems = 1;
    this.pageSize = 1;
    this.pages = [];
    this.pageSelected = new EventEmitter();
    this.activePage = 1;
  }

  ngOnInit() {
    this.pages = [];
    for (
      let i = 1;
      i <= this.utilService.getNoPages(this.totalItems, this.pageSize);
      i++
    ) {
      this.pages.push(i);
    }
  }

  ngOnChanges(changes : any) {
    this.totalItems = changes.totalItems.currentValue;
    this.pages = [];
    for (
      let i = 1;
      i <= this.utilService.getNoPages(this.totalItems, this.pageSize);
      i++
    ) {
      this.pages.push(i);
    }
    this.activePage = 1; // Darko dodao ovo, izvini ako je zeznulo nesto
      // stavio da bi vratio na prvu stranu kad dodje do promene prikazanog sadrzaja (delovalo mi logicno)
  }

  selected(newPage: number) {
    if (
      newPage >= 1 &&
      newPage <= this.utilService.getNoPages(this.totalItems, this.pageSize)
    ) {
      this.activePage = newPage;
      this.pageSelected.emit(this.activePage);
    }
  }
}
