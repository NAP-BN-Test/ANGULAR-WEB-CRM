import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { AppModuleService } from 'src/app/services/app-module.service';
import { EVENT_PUSH, CLICK_DETAIL, REPORT_TYPE } from 'src/app/services/constant/app-constant';
import { MatPaginator } from '@angular/material';


@Component({
  selector: 'app-table-full-data',
  templateUrl: './table-full-data.component.html',
  styleUrls: ['./table-full-data.component.scss']
})
export class TableFullDataComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output('clickPagination') clickPagination = new EventEmitter();
  @Output('clickBtn') clickBtn = new EventEmitter();
  @Output('clickCell') clickCell = new EventEmitter();

  listTbData: any;
  pageSizeOptions: number[] = [10, 25, 50, 100, 200];

  displayedColumns: string[] = [];
  displayedColumnsAll: any[];

  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);


  constructor(
    public mService: AppModuleService,
  ) {
    // Bắt event thay đổi list
    this.mService.currentEvent.subscribe(sData => {
      // event update data trong bảng
      if (sData.name == EVENT_PUSH.TABLE) {

        //thông tin data trong bảng
        this.dataSource = new MatTableDataSource(sData.params.listData);

        //thông tin setup bảng
        this.displayedColumns = [];
        this.displayedColumnsAll = [];

        this.listTbData = sData.params.listTbData;

        this.listTbData.listColum.forEach(item => {
          this.displayedColumns.push(item.cell);
        });
        this.displayedColumnsAll = this.listTbData.listColum;
      }

    })

  }

  ngOnInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  /** Click vào ô và bắt event */
  onClickCell(row, cell) {

    if (this.listTbData.clickDetail == CLICK_DETAIL.MAIL_REPORT) {
      if (cell == 'email') {
        this.clickCell.emit({
          clickDetail: CLICK_DETAIL.MAIL_REPORT,
          data: row
        });
      }
    }

  }

}
