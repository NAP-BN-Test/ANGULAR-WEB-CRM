import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  STATUS,
  SORT_TYPE,
  LOCAL_STORAGE_KEY,
} from "src/app/services/constant/app-constant";
import { MatInput, MatSelect, MatDialog } from "@angular/material";

import * as moment from "moment";
import { AddHistoryComponent } from "src/app/dialogs/add-history/add-history.component";

@Component({
  selector: "app-filter-bar",
  templateUrl: "./filter-bar.component.html",
  styleUrls: ["./filter-bar.component.scss"],
})
export class FilterBarComponent implements OnInit {
  @ViewChild("dateStartInput", { read: MatInput }) dateStartInput: MatInput;
  @ViewChild("dateEndInput", { read: MatInput }) dateEndInput: MatInput;
  @ViewChild("searchKeyInput", { read: MatInput }) searchKeyInput: MatInput;

  @ViewChild("userSelect", { read: MatSelect }) userSelect: MatSelect;
  @ViewChild("stepSelect", { read: MatSelect }) stepSelect: MatSelect;
  @ViewChild("citySelect", { read: MatSelect }) citySelect: MatSelect;
  @ViewChild("timeTypeSelect", { read: MatSelect }) timeTypeSelect: MatSelect;

  @Input("noAdd") noAdd = false;
  @Input("noImport") noImport = false;

  @Input("toppingList") toppingList = [];

  @Input("paramsObj") paramsObj: any;

  @Output("searchChange") searchChange = new EventEmitter();
  @Output("clickAdd") clickAdd = new EventEmitter();
  @Output("clickImport") clickImport = new EventEmitter();
  @Output("sort") sort = new EventEmitter();

  hasSort = false;

  mTitle: any;

  listUser = [];
  listStep = [];
  listCity = [];

  searchKey = "";

  userID = -1;
  stepID = -1;
  cityID = -1;

  timeType = 1;

  // timeFrom = null;
  // timeTo = null;

  sortUser = false;
  sortStep = false;
  sortCity = false;
  sortTimeStart = false;
  sortTimeEnd = false;
  sortSearch = false;
  sortTimeType = false;

  constructor(public mService: AppModuleService, public dialog: MatDialog) {}

  ngOnInit() {
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    this.mService
      .getApiService()
      .sendRequestGET_LIST_USER(1)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.listUser = data.array;
          this.listUser.unshift({ id: -1, name: this.mTitle.all });
        }
      });

    this.mService
      .getApiService()
      .sendRequestGET_DEAL_STAGE()
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.listStep = data.array;
          this.listStep.unshift({ id: -1, name: this.mTitle.all });
        }
      });

    this.mService
      .getApiService()
      .sendRequestGET_LIST_CITY()
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.listCity = data.array;
          this.listCity.unshift({ id: -1, name: this.mTitle.all });
        }
      });

    this.handleParams();
  }

  onClickAdd() {
    this.clickAdd.emit();
  }

  onClickImport() {
    this.clickImport.emit();
  }

  onClickSort() {
    if (
      this.userSelect.value ||
      this.stepSelect.value ||
      this.citySelect.value ||
      this.dateStartInput.value ||
      this.dateEndInput.value ||
      this.searchKeyInput.value != ""
    )
      this.hasSort = true;
    else this.hasSort = false;

    this.sort.emit({
      userID: toID(this.userSelect.value),
      stepID: toID(this.stepSelect.value),
      cityID: toID(this.citySelect.value),
      timeType: this.timeType,
      timeFrom: toDate(this.dateStartInput.value),
      timeTo: toDate(this.dateEndInput.value),
      searchKey: this.searchKeyInput.value,
    });
  }

  onClickHistory() {
    this.mService.publishPageRoute("history");
  }

  onClickSave() {
    const dialogRef = this.dialog.open(AddHistoryComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let params: any = this.mService.handleActivatedRoute();

        this.mService
          .getApiService()
          .sendRequestADD_HISTORY(
            res.name,
            this.mService.getRouterUrl(),
            JSON.stringify(params)
          )
          .then((data) => {
            this.mService.showSnackBar(data.message);
          });
      }
    });
  }

  onClickClear() {
    this.dateStartInput.value = "";
    this.dateEndInput.value = "";
    this.searchKeyInput.value = "";
    this.userSelect.value = "";
    this.stepSelect.value = "";
    this.citySelect.value = "";
    this.timeTypeSelect.value = "";

    this.hasSort = false;
  }

  onSortChange(event) {
    this.sortUser = event.value.includes(SORT_TYPE.USER);
    this.sortStep = event.value.includes(SORT_TYPE.STEP);
    this.sortCity = event.value.includes(SORT_TYPE.CITY);
    this.sortTimeStart = event.value.includes(SORT_TYPE.TIME_START);
    this.sortTimeEnd = event.value.includes(SORT_TYPE.TIME_END);
    this.sortSearch = event.value.includes(SORT_TYPE.SEARCH);
    this.sortTimeType = event.value.includes(SORT_TYPE.TIME_TYPE);
  }

  toppingListSelected;
  handleParams() {
    setTimeout(() => {
      this.toppingListSelected = [];
      if (this.paramsObj) {
        if (this.paramsObj.stepID) {
          this.stepSelect.value = this.paramsObj.stepID;
          this.sortStep = true;
          this.toppingListSelected.push(SORT_TYPE.STEP);
        }
        if (this.paramsObj.cityID) {
          this.citySelect.value = this.paramsObj.cityID;
          this.sortCity = true;
          this.toppingListSelected.push(SORT_TYPE.CITY);
        }
        if (this.paramsObj.timeFrom) {
          this.dateStartInput.value = this.paramsObj.timeFrom;
          this.sortTimeStart = true;
          this.toppingListSelected.push(SORT_TYPE.TIME_START);
        }
        if (this.paramsObj.timeTo) {
          this.dateEndInput.value = this.paramsObj.timeTo;
          this.sortTimeEnd = true;
          this.toppingListSelected.push(SORT_TYPE.TIME_END);
        }
        if (this.paramsObj.userIDFind) {
          this.userSelect.value = this.paramsObj.userIDFind;
          this.sortUser = true;
          this.toppingListSelected.push(SORT_TYPE.USER);
        }
        if (this.paramsObj.searchKey) {
          this.searchKeyInput.value = this.paramsObj.searchKey;
          this.sortSearch = true;
          this.toppingListSelected.push(SORT_TYPE.SEARCH);
        }
      }
    }, 500);
  }
}

function toDate(time): string {
  if (time) return moment(time).format("YYYY-MM-DD");
  else return null;
}
function toID(value): number {
  if (value) {
    if (!isNaN(value)) return Number(value);
    else return null;
  } else return null;
}
