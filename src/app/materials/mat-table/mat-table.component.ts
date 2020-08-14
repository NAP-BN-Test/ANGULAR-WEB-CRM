import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AppModuleService } from 'src/app/services/app-module.service';
import { BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL, MENU_INDEX } from 'src/app/services/constant/app-constant';


@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output('clickPagination') clickPagination = new EventEmitter();
  @Output('clickBtn') clickBtn = new EventEmitter();
  @Output('clickCell') clickCell = new EventEmitter();

  page;
  collectionSize;

  listTbData: any;
  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;
  pageSizeOptions: number[] = [10, 25, 50, 100, 200];

  displayedColumns: string[] = [];
  displayedColumnsAll: any[] = [];
  displayedColumnsAction: any[] = [];

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  dataSubscribe: any


  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    // Bắt event thay đổi list
    this.dataSubscribe = this.mService.currentEvent.subscribe(sData => {
      // event update data trong bảng
      if (sData.name == EVENT_PUSH.TABLE) {
        //thông tin pagination
        this.page = sData.params.page;
        this.collectionSize = sData.params.collectionSize;
        //thông tin data trong bảng
        this.dataSource = new MatTableDataSource(sData.params.listData);
        this.dataSource.sort = this.sort;
        this.selection.clear();
        //thông tin setup bảng
        this.displayedColumns = ['id'];
        this.displayedColumnsAll = [];
        this.listTbData = sData.params.listTbData;

        setTimeout(() => {
          if (sData.params.listTbData.menuIndex == MENU_INDEX.REPORT) {
            this.displayedColumns = [];
          }
          this.listTbData.listColum.forEach(item => {
            this.displayedColumns.push(item.cell);
          })
          this.displayedColumnsAll = this.listTbData.listColum;
        });
      }
      //event xóa nút check khi đã thao tác xong
      if (sData.name == EVENT_PUSH.SELECTION) {
        this.selection.clear();
      }
    })
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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

      this.selection.selected.forEach(selectionItem => {
        if (selectionItem.email)
          listMail.push({ email: selectionItem.email, name: selectionItem.name })
      })

      ev = {
        btnType: item.id,
        data: JSON.stringify(listMail)
      }
    } else {
      let listID = [];
      this.selection.selected.forEach(item => {
        listID.push(item.id)
      });
      ev = {
        btnType: item.id,
        data: JSON.stringify(listID)
      }
    }

    this.clickBtn.emit(ev)
  }

  /** Click vào ô và bắt event */
  onClickCell(row, cell) {

    if (this.listTbData.clickDetail == CLICK_DETAIL.CONTACT) {
      if (cell == 'name') {
        this.clickCell.emit({
          clickDetail: CLICK_DETAIL.CONTACT,
          data: row
        });
      } else if (cell.includes('company')) {
        if (row.companyID != null)
          this.clickCell.emit({
            clickDetail: CLICK_DETAIL.COMPANY,
            data: row
          });
      }
    }

    else if (this.listTbData.clickDetail == CLICK_DETAIL.COMPANY) {
      if (cell == 'name') {
        this.clickCell.emit({
          clickDetail: CLICK_DETAIL.COMPANY,
          data: row
        });
      }
    }

    else if (this.listTbData.clickDetail == CLICK_DETAIL.ACTIVITY) {
      if (cell.includes('contact')) {
        if (row.companyID != null)
          this.clickCell.emit({
            clickDetail: CLICK_DETAIL.CONTACT,
            data: row
          });
      }
      else if (cell.includes('company')) {
        if (row.companyID != null)
          this.clickCell.emit({
            clickDetail: CLICK_DETAIL.COMPANY,
            data: row
          });
      }
      else if (cell.includes('taskName')) {
        if (row.type == 1) {
          this.clickCell.emit({
            clickDetail: CLICK_DETAIL.COMPANY,
            data: row
          });
        }
        else if (row.type == 2) {
          this.clickCell.emit({
            clickDetail: CLICK_DETAIL.CONTACT,
            data: row
          });
        }
      }
    }

    else if (this.listTbData.clickDetail == CLICK_DETAIL.MAIL_LIST) {
      this.clickCell.emit({
        clickDetail: CLICK_DETAIL.MAIL_LIST,
        data: row
      });
    }
    else if (this.listTbData.clickDetail == CLICK_DETAIL.ADDRESS_BOOK) {
      this.clickCell.emit({
        clickDetail: CLICK_DETAIL.ADDRESS_BOOK,
        data: row
      });
    }
  }

}