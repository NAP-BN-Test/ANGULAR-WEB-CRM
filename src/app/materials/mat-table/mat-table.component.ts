import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AppModuleService } from 'src/app/services/app-module.service';
import { BUTTON_TYPE, EVENT_PUSH, CLICK_DETAIL } from 'src/app/services/constant/app-constant';


@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input('page') page;
  @Input('collectionSize') collectionSize;

  @Input('listData') listData: any;
  @Input('listTbData') listTbData: any;

  @Output('clickPagination') clickPagination = new EventEmitter();
  @Output('clickBtn') clickBtn = new EventEmitter();
  @Output('clickCell') clickCell = new EventEmitter();


  itemPerPage = localStorage.getItem('item-per-page') ? JSON.parse(localStorage.getItem('item-per-page')) : 10;

  pageSizeOptions: number[] = [10, 25, 50, 100, 200];

  displayedColumns: string[] = ['id'];
  displayedColumnsAll: any[];

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  constructor(
    public mService: AppModuleService,
  ) {
    // Assign the data to the data source for the table to render
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.listData);
      this.dataSource.sort = this.sort;

      this.onUpdateTable();
    }, 1000);

    // Bắt event thay đổi list
    this.mService.currentEvent.subscribe(sData => {
      if (sData.name == EVENT_PUSH.TABLE) {
        this.dataSource = new MatTableDataSource(sData.params);
        this.dataSource.sort = this.sort;
        this.selection.clear();
      }
      if (sData.name == EVENT_PUSH.SELECTION) {
        this.selection.clear();
      }
    })

  }

  ngOnInit(): void {
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

  /** Sắp xếp các cột */
  onUpdateTable() {

    this.listTbData.listColum.forEach(item => {
      this.displayedColumns.push(item.cell);
    })
    this.displayedColumnsAll = this.listTbData.listColum;
  }

  /** Click các button và trả về các loại btn tương ứng, gồm loại btn và data */
  onClickBtn(item) {
    let ev;
    if (item.id == BUTTON_TYPE.ADD_LIST_MAIL) {
      let listMail = [];
      this.selection.selected.forEach(item => {
        if (item.email.trim() != "" && item.checked)
          listMail.push({ email: item.email, name: item.name })
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
        if (!row.companyID || row.companyID != -1)
          this.clickCell.emit({
            clickDetail: CLICK_DETAIL.COMPANY,
            data: row
          });
      }
    }
    // else if (this.listTbData.clickDetail == CLICK_DETAIL.COMPANY) {
    //   if (cell == 'name') {
    //     this.clickCell.emit({
    //       clickDetail: CLICK_DETAIL.CONTACT,
    //       data: row
    //     });
    //   } else if (cell.includes('company')) {
    //     this.clickCell.emit({
    //       clickDetail: CLICK_DETAIL.CONTACT,
    //       data: row
    //     });
    //   }
    // }
  }

}