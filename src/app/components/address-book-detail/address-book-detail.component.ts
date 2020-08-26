// atuthor: GiHug 21/08/2020
import { Component, OnInit } from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
  EVENT_PUSH,
  BUTTON_TYPE,
} from "src/app/services/constant/app-constant";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { MatTabChangeEvent, MatDialog } from "@angular/material";
import { DialogComponent } from "src/app/dialogs/dialog/dialog.component";
import { AddUpdateContactToAddressBookComponent } from "src/app/dialogs/add-update-contact-to-address-book/add-update-contact-to-address-book.component";

@Component({
  selector: "app-address-book-detail",
  templateUrl: "./address-book-detail.component.html",
  styleUrls: ["./address-book-detail.component.scss"],
})
export class AddressBookDetailComponent implements OnInit {
  mTitle: any;
  page: number = 1;
  myForm: FormGroup;
  hasEdit: boolean = true;
  addressBookID: number = -1;
  addressBookData: any;
  collectionSize: number;

  filterListNation: Observable<string[]>;
  listNation = [];
  filterListRelationship: Observable<string[]>;
  listRelationship = [];

  //data for component table
  listTbDataContact = {
    listColum: [
      { name: "Full Name", cell: "name" },
      { name: "Job Tile", cell: "JobTileName" },
      { name: "Email", cell: "email" },
      { name: "Phone", cell: "phone" },
      { name: "Fax", cell: "fax" },
      { name: "Status", cell: "Status" },
      { name: "Note", cell: "Note" },
      { name: "Action", cell: undefined },
    ],
    listButton: [{ id: BUTTON_TYPE.DELETE, name: "Xóa", color: "warn" }],
  };

  listTbDataHistory = {
    listColum: [
      { name: "ID", cell: "ContactID" },
      { name: "Name", cell: "ContactName" },
      { name: "Date", cell: "Date" },
      { name: "Content", cell: "Description" },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    public dialog: MatDialog
  ) {
    this.myForm = this.formBuilder.group({
      id: [""],
      company: [""],
      address: [""],
      phone: [""],
      email: [""],
      fax: [""],
      nation: [""],
      note: [""],
      properties: [""],
      relationship: [""],
    });
  }

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.addressBookID = params.addressBookID;
      this.page = params.page;
      //==================================================================
      this.onLoadData(this.addressBookID);
      //---------------------------------------------------------------------------
      this.mService
        .getApiService()
        .sendRequestGET_ALL_CATEGORY_COUNTRY()
        .then((data) => {
          this.listNation = data.array;
          this.filterListNation = this.myForm.controls.nation.valueChanges.pipe(
            startWith(""),
            map((value) => this._filter(value))
          );
        });
      this.mService
        .getApiService()
        .sendRequestGET_LIST_NAME_COMPANY()
        .then((data) => {
          this.listRelationship = data.array;
          this.filterListRelationship = this.myForm.controls.relationship.valueChanges.pipe(
            startWith(""),
            map((value) => this._filterRelationship(value))
          );
        });
    } else {
      this.mService.publishPageRoute("login");
    }
  }

  onLoadData(addressBookID) {
    this.mService
      .getApiService()
      .sendRequestGET_DETAIL_COMPANY(addressBookID)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          let addressBookData = data.obj;
          this.myForm = this.formBuilder.group({
            id: addressBookData.id,
            company: addressBookData.name,
            address: addressBookData.address,
            phone: addressBookData.phone,
            email: addressBookData.email,
            fax: addressBookData.Fax,
            nation: addressBookData.Country,
            note: addressBookData.Note,
            properties: addressBookData.Role,
            relationship: addressBookData.ParentName,
          });
        }
      });
  }

  onSubmit(value) {
    let obj = this.listNation.find((item) => {
      return item.name.toLowerCase() == this.myForm.value.nation.toLowerCase();
    });
    let _obj = this.listRelationship.find((item) => {
      return item.name.toLowerCase() == this.myForm.value.relationship.toLowerCase();
    });
    value["CountryID"] = returnIDOrNull(obj);
    value["ChildID"] = returnIDOrNull(_obj);
    console.log(value);
    this.mService
      .getApiService()
      .sendRequestUPDATE_ADDRESS_BOOK(value)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.showSnackBar(data.message);
        }
      });
  }

  onClickEdit() {
    this.hasEdit = !this.hasEdit;
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listNation.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterRelationship(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listRelationship.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onClickCancel() {
    this.mService.publishPageRoute("address-book");
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index === 1) {
      this.onLoadDataContact(1, this.addressBookID);
    } else if (tabChangeEvent.index === 2) {
      this.onLoadDataHistory(1, this.addressBookID);
    }
  };

  onLoadDataContact(page, addressBookID) {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_CONTACT_FROM_ADDRESS_BOOK(page, addressBookID)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbDataContact,
          });
        }
      });
  }

  onClickPaginationContact(event) {
    this.onLoadDataContact(event, this.addressBookID);
  }

  onClickBtnContact(event) {
    if (event.btnType == BUTTON_TYPE.DELETE) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: "500px",
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.mService
            .getApiService()
            .sendRequestDELETE_CONTACT(event.data)
            .then((data) => {
              if (data.status == STATUS.SUCCESS) {
                this.onLoadDataContact(1, this.addressBookID);
              }
            });
        }
      });
    }
  }

  onClickAddContact() {
    const dialogRef = this.dialog.open(AddUpdateContactToAddressBookComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          FullName: res.FullName,
          Position: res.Position,
          Email: res.Email,
          Phone: res.Phone,
          Fax: res.Fax,
          Status: res.Activity,
          Note: res.Note,
          CompanyID: this.addressBookID,
        };
        this.mService
          .getApiService()
          .sendRequestADD_CONTACT_ADDRESS_BOOK(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadDataContact(1, this.addressBookID);
            }
          });
      }
    });
  }

  onClickEditContact(event) {
    const dialogRef = this.dialog.open(AddUpdateContactToAddressBookComponent, {
      width: "500px",
      data: {
        FullName: event.data.name,
        Position: event.data.JobTileName,
        Email: convertObjectToString(event.data.email),
        Phone: convertObjectToString(event.data.phone),
        Fax: convertObjectToString(event.data.fax),
        Status: event.data.Activity,
        Note: event.data.Note,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let obj = {
          id: event.data.id,
          FullName: res.FullName,
          Position: res.Position,
          Email: res.Email,
          Phone: res.Phone,
          Fax: res.Fax,
          Note: res.Note,
          Status: res.Activity,
        };
        this.mService
          .getApiService()
          .sendRequestUPDATE_CONTACT_ADDRESS_BOOK(obj)
          .then((data) => {
            this.mService.showSnackBar(data.message);
            if (data.status == STATUS.SUCCESS) {
              this.onLoadDataContact(1, this.addressBookID);
            }
          });
      }
    });
  }

  //============================================== History ==================================
  onLoadDataHistory(page, addressBookID) {
    this.mService
      .getApiService()
      .sendRequestGET_LIST_HISTORY_CONTACT(page, addressBookID)
      .then((data) => {
        if (data.status == STATUS.SUCCESS) {
          this.mService.publishEvent(EVENT_PUSH.TABLE, {
            page: this.page,
            collectionSize: this.collectionSize,
            listData: data.array,
            listTbData: this.listTbDataHistory,
          });
        }
      });
  }

  onClickPaginationHistory(event) {
    this.onLoadDataHistory(event, this.addressBookID);
  }
}

// Hàm xử lý đổi dạng [object object] về chuỗi string cách nhau bởi dấu `;`
// Khi thực hiện trả về loại bỏ kí tự chấm phẩy cuối cùng
function convertObjectToString(values) {
  let a: string = "";
  for (const value of values) {
    a += `${value.name}` + `;`;
  }
  let result = a.substring(0, a.length - 1);
  return result;
}

function returnIDOrNull(value) {
  if (value) {
    return value.id;
  }
  return null;
}
