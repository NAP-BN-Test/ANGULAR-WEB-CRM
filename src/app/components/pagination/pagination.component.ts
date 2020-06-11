import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { DialogSettingItemPerPageComponent } from 'src/app/dialogs/dialog-setting-item-per-page/dialog-setting-item-per-page.component';
import { MatDialog } from '@angular/material';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  pageSizeOptions: number[] = [10, 25, 50, 100, 200];

  @Input('page') page;
  @Input('itemPerPage') itemPerPage;
  @Input('collectionSize') collectionSize;

  @Output('clickPagination') clickPagination = new EventEmitter();
  @Output('clickSettingItemPerPage') clickSettingItemPerPage = new EventEmitter();

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onClickPagination(event) {
    if (event) {
      this.mService.getApiService().setItemPerPage(event.pageSize);
      this.clickPagination.emit(event.pageIndex + 1);
    }
  }

  // onClickSettingItemPerPage() {
  //   const dialogRef = this.dialog.open(DialogSettingItemPerPageComponent, {
  //     width: '500px'
  //   });

  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       this.mService.getApiService().setItemPerPage(res);

  //       this.clickSettingItemPerPage.emit(res);
  //     }
  //   });
  // }

}
