import { Component, OnInit } from "@angular/core";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
  EVENT_PUSH,
  BUTTON_TYPE,
} from "src/app/services/constant/app-constant";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { AppModuleService } from "src/app/services/app-module.service";
import { ParamsKey } from "src/app/services/constant/paramskey";
import { MatDialog } from '@angular/material';
import { AddCategoryCityComponent } from 'src/app/dialogs/add-category-city/add-category-city.component';


@Component({
  selector: "app-mailmerge-campaign-list",
  templateUrl: "./mailmerge-campaign-list.component.html",
  styleUrls: ["./mailmerge-campaign-list.component.scss"],
})
export class MailmergeCampaignListComponent implements OnInit {
  listTbData = {
    listColum: [
      { name: "Name", cell: "Name" },
      { name: "Template", cell: "Template" },
      { name: "Create Date", cell: "Create_Date" },
      { name: "Create User", cell: "UserID" },
      { name: "Number Of AddressBook", cell: "Number_Address" },
      { name: "Thao tác", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  closeResult = "";
  mTitle: any;
  levels: Array<Object> = [
    { num: 0, name: "AA" },
    { num: 1, name: "BB" },
  ];
  searchKey = null;
  page = 1;
  collectionSize: number;
  paramsObj: any;

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.page = params.page;

      this.onLoadData(this.page, this.searchKey);
    } else {
      this.mService.publishPageRoute("login");
    }
  }

  onLoadData(page: number, searchKey: string) {
    this.mService
      .getApiService()
      .sendRequestGET_MAILMERGE_CAMPAIGN(page, searchKey)
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.collectionSize = data.count;

          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });

          let listParams = [{ key: "page", value: this.page }];
          if (this.searchKey != "")
            listParams.push({ key: "searchKey", value: this.searchKey });

          this.paramsObj = this.mService.handleParamsRoute(listParams);
        }
      });
  }

  onClickPagination(event) {
    this.onLoadData(event, this.searchKey);
  }

  openNew(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "add-new-campaign" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  onClickEdit(event) {
    const dialogRef = this.dialog.open(AddCategoryCityComponent, {
      width: "500px",
      data: {
        name: event.data.name,
        code: event.data.code,
        country: event.data.countryName,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          name: res.name,
          code: res.code,
          countryID: res.countryID,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_CATEGORY_CITY(obj, event.data.id)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(1, this.searchKey);
            }
          });
      }
    });
  }

  openEdit(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "edit-campaign" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
