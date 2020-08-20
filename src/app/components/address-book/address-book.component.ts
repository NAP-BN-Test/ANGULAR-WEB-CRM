// author: GiHug 12/08/2020
import {
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Component,
} from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  LOCAL_STORAGE_KEY,
  BUTTON_TYPE,
  STATUS,
  EVENT_PUSH,
  CLICK_DETAIL,
  SORT_TYPE,
} from "src/app/services/constant/app-constant";
import { ParamsKey } from "src/app/services/constant/paramskey";
import { MatSelect, MatInput, MatDialog } from "@angular/material";
import { AddNewCustomerComponent } from "src/app/dialogs/add-new-customer/add-new-customer.component";
import { DialogComponent } from "src/app/dialogs/dialog/dialog.component";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { startWith, map } from "rxjs/operators";

export interface ConditionFields {
  name: string;
}

export interface Fields {
  name: string;
}

@Component({
  selector: "app-address-book",
  templateUrl: "./address-book.component.html",
  styleUrls: ["./address-book.component.scss"],
})
export class AddressBookComponent implements OnInit {

  mTitle: any;
  page: number = 1;
  collectionSize: number;
  paramsObj: any;
  hasSort = false;
  hasSearch = false;

  name = "";
  address = "";
  email = "";
  phone = "";
  fax = "";
  userIDFind = null;
  cityID = null;
  countryID = null;
  role = null;

  listConditions: ConditionFields[] = [
    { name: "And" },
    { name: "Or" },
    { name: "Not" },
  ];

  listFields: Fields[] = [
    { name: "Name" },
    { name: "Email" },
    { name: "Address" },
    { name: "ShortName" },
    { name: "Phone" },
    { name: "Website" },
    { name: "Source" },
    { name: "Note" },
    { name: "Fax" },
    { name: "Role" },
  ];

  filteredConditions: Observable<ConditionFields[]>[] = [];
  filteredFields: Observable<Fields[]>[] = [];
  myForm: FormGroup;

  listTbData = {
    clickDetail: CLICK_DETAIL.ADDRESS_BOOK,
    listColum: [
      { name: "Full Name", cell: "name" },
      { name: "Address", cell: "address" },
      { name: "City", cell: "city" },
      { name: "Country", cell: "Country" },
      { name: "Email", cell: "email" },
      { name: "Phone", cell: "phone" },
      { name: "Fax", cell: "Fax" },
      { name: "Role", cell: "Role" },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  // danh sách các lựa chọn bộ lọc
  toppingListSelected = [];

  constructor(
    public mService: AppModuleService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      search: [""],
      items: this.initItems(),
    });
    this.ManageNameControl(0);
  }

  initItems() {
    var formArray = this.fb.array([]);

    formArray.push(
      this.fb.group({
        conditionFields: [""],
        fields: [""],
        searchFields: [""],
      })
    );
    return formArray;
  }

  ManageNameControl(index: number) {
    var arrayControl = this.myForm.get("items") as FormArray;
    this.filteredConditions[index] = arrayControl
      .at(index)
      .get("conditionFields")
      .valueChanges.pipe(
        startWith<string | ConditionFields>(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterConditions(name) : this.listConditions.slice()
        )
      );
    this.filteredFields[index] = arrayControl
      .at(index)
      .get("fields")
      .valueChanges.pipe(
        startWith<string | Fields>(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterFields(name) : this.listFields.slice()
        )
      );
  }

  addNewItem() {
    const controls = <FormArray>this.myForm.controls["items"];
    let formGroup = this.fb.group({
      conditionFields: [""],
      fields: [""],
      searchFields: [""],
    });
    controls.push(formGroup);
    // Build the account Auto Complete values
    this.ManageNameControl(controls.length - 1);
  }
  removeItem(i: number) {
    const controls = <FormArray>this.myForm.controls["items"];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredConditions.splice(i, 1);
    this.filteredFields.splice(i, 1);
  }

  private _filterConditions(value: string): ConditionFields[] {
    const filterValue = value.toLowerCase();
    return this.listConditions.filter((option: any) =>
      option.name.toLowerCase().indexOf(filterValue)
    );
  }

  private _filterFields(value: string): Fields[] {
    const filterValue = value.toLowerCase();

    return this.listFields.filter((option: any) =>
      option.name.toLowerCase().indexOf(filterValue)
    );
  }

  displayFnConditions(ConditionFields?: ConditionFields): string | undefined {
    return ConditionFields ? ConditionFields.name : undefined;
  }

  displayFnFields(Fields?: Fields): string | undefined {
    return Fields ? Fields.name : undefined;
  }

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.page = params.page;
      this.onLoadData(
        this.page,
        this.name,
        this.userIDFind,
        this.address,
        this.cityID,
        this.countryID,
        this.email,
        this.phone,
        this.fax,
        this.role
      );
    } else {
      this.mService.publishPageRoute("login");
    }
  }

  onLoadData(
    page: number,
    name: string,
    userIDFind: number,
    address: string,
    cityID: number,
    countryID: number,
    email: string,
    phone: string,
    fax: string,
    role: string
  ) {
    this.mService
      .getApiService()
      .sendRequestSEARCH_ADDRESS_BOOK(
        page,
        null
      )
      .then((data) => {
        if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
          this.collectionSize = data.all;
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });
          let listParams = [];
          if (this.name != "")
            listParams.push({ key: "name", value: this.name });
          if (this.userIDFind != "")
            listParams.push({ key: "userIDFind", value: this.userIDFind });
          if (this.address != "")
            listParams.push({ key: "address", value: this.address });
          if (this.cityID != "")
            listParams.push({ key: "cityID", value: this.cityID });
          if (this.cityID != "")
            listParams.push({ key: "countryID", value: this.countryID });
          if (this.email != "")
            listParams.push({ key: "email", value: this.email });
          if (this.phone != "")
            listParams.push({ key: "phone", value: this.phone });
          if (this.fax != "") listParams.push({ key: "fax", value: this.fax });
          if (this.role != "")
            listParams.push({ key: "role", value: this.role });
          listParams.push({ key: "page", value: this.page });
          this.paramsObj = this.mService.handleParamsRoute(listParams);
        }
      });
  }

  onClickPagination(event) {
    this.onLoadData(
      event,
      this.name,
      this.userIDFind,
      this.address,
      this.cityID,
      this.countryID,
      this.email,
      this.phone,
      this.fax,
      this.role
    );
  }

  onClickCell(event) {
    console.log(event);
    this.mService.publishPageRoute("address-book-detail", {
      addressBookID: event.data.id,
    });
  }

  onClickSearch() {
    this.hasSearch = !this.hasSearch;
  }

  onClickAddNew() {
    const dialogRef = this.dialog.open(AddNewCustomerComponent, {
      width: "700px",
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          OldName: res.OldName,
          name: res.FullName,
          address: res.Address,
          email: res.Email,
          phone: res.Phone,
          Fax: res.Fax,
          CountryID: res.National,
          Note: res.Note,
          Role: res.Properties,
        };
        console.log(obj);

        this.mService
          .getApiService()
          .sendRequestADD_COMPANY(null, obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadData(
                1,
                this.name,
                this.userIDFind,
                this.address,
                this.cityID,
                this.countryID,
                this.email,
                this.phone,
                this.fax,
                this.role
              );
            }
          });
      }
    });
  }

  onClickBtn(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "500px",
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_COMPANY(event.data)
            .then((data) => {
              if (data.status == STATUS.SUCCESS) {
                this.onLoadData(
                  1,
                  this.name,
                  this.userIDFind,
                  this.address,
                  this.cityID,
                  this.countryID,
                  this.email,
                  this.phone,
                  this.fax,
                  this.role
                );
              }
            });
        }
      });
    }
  }

  onClickClear() {
    this.myForm.reset();
  }

  onSubmit(value) {
    console.log(value);
    console.log(JSON.stringify(value));
    this.mService
      .getApiService()
      .sendRequestSEARCH_ADDRESS_BOOK(1, JSON.stringify(value))
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.collectionSize = data.all;
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbData,
          });
        }
      });
  }
}