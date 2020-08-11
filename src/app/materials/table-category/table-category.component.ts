import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  BUTTON_TYPE,
  EVENT_PUSH,
  CLICK_DETAIL,
  MENU_INDEX,
} from "src/app/services/constant/app-constant";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-table-category",
  templateUrl: "./table-category.component.html",
  styleUrls: ["./table-category.component.scss"],
})
export class TableCategoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output("clickPagination") clickPagination = new EventEmitter();
  @Output("clickBtn") clickBtn = new EventEmitter();
  @Output("clickEdit") clickEdit = new EventEmitter();
  @Output('clickCell') clickCell = new EventEmitter();

  listTbData: any;
  itemPerPage = localStorage.getItem("item-per-page")
    ? JSON.parse(localStorage.getItem("item-per-page"))
    : 10;
  pageSizeOptions: number[] = [10, 25, 50, 100, 200];

  displayedColumns: string[] = [];
  displayedColumnsAll: any[] = [];
  displayedColumnsAction: any[] = [];

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  dataSubscribe: any;

  constructor(public mService: AppModuleService) {}

  ngOnInit() {
    // Bắt event thay đổi list
    this.dataSubscribe = this.mService.currentEvent.subscribe((sData) => {
      // event update data trong bảng
      if (sData.name == EVENT_PUSH.TABLE) {
        //thông tin data trong bảng
        this.dataSource = new MatTableDataSource(sData.params.listData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection.clear();
        //thông tin setup bảng
        this.displayedColumns = ["id"];
        this.displayedColumnsAll = [];
        this.listTbData = sData.params.listTbData;

        setTimeout(() => {
          this.listTbData.listColum.forEach((item) => {
            this.displayedColumns.push(item.cell);
          });
          this.displayedColumnsAll = this.listTbData.listColum;
        });
      }
      //event xóa nút check khi đã thao tác xong
      if (sData.name == EVENT_PUSH.SELECTION) {
        this.selection.clear();
      }
    });
  }

  ngOnDestroy() {
    this.dataSubscribe.unsubscribe();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource ? this.dataSource.data.length : 0;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }

  /** Event when click pagination */
  onClickPagination(event) {
    if (event) {
      this.mService.getApiService().setItemPerPage(event.pageSize);
      this.clickPagination.emit(event.pageIndex + 1);
    }
  }

  /** Click các button và trả về các loại btn tương ứng, gồm loại btn và data */
  onClickBtn(item) {
    let ev;
    if (item.id == BUTTON_TYPE.ADD_LIST_MAIL) {
      let listMail = [];

      this.selection.selected.forEach((selectionItem) => {
        if (selectionItem.email)
          listMail.push({
            email: selectionItem.email,
            name: selectionItem.name,
          });
      });

      ev = {
        btnType: item.id,
        data: JSON.stringify(listMail),
      };
    } else {
      let listID = [];
      this.selection.selected.forEach((item) => {
        // Gihug sửa lấy cả id và ID trả về
        if (!item.id) listID.push(item.ID);
        else listID.push(item.id);
      });
      ev = {
        btnType: item.id,
        data: JSON.stringify(listID),
      };
    }

    this.clickBtn.emit(ev);
  }

  onClickEdit(row) {
    this.clickEdit.emit({
      data: row,
    });
  }

  /** Click vào ô và bắt event */
  // Gihug viết thêm click cell
  onClickCell(row, cell) {

    if (this.listTbData.clickDetail == CLICK_DETAIL.MAILMERGE_CAMPAIGN_LIST) {
      this.clickCell.emit({
        clickDetail: CLICK_DETAIL.MAILMERGE_CAMPAIGN_LIST,
        data: row
      });
    }
    else if (this.listTbData.clickDetail == CLICK_DETAIL.ADDITIONAL_INFORMATION) {
      this.clickCell.emit({
        clickDetail: CLICK_DETAIL.ADDITIONAL_INFORMATION,
        data: row
      });
    }
    else if (this.listTbData.clickDetail == CLICK_DETAIL.MAILMERGE_TEMPLATE_LIST) {
      this.clickCell.emit({
        clickDetail: CLICK_DETAIL.MAILMERGE_TEMPLATE_LIST,
        data: row
      });
    }
  }
}
