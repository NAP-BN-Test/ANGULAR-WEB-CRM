// atuthor: GiHug 21/08/2020
import { Component, OnInit } from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
} from "src/app/services/constant/app-constant";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

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

  filterListNation: Observable<string[]>;
  listNation = [];

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService
  ) {
    this.myForm = this.formBuilder.group({
      id: "",
      company: "",
      address: "",
      phone: "",
      email: "",
      fax: "",
      nation: "",
      note: "",
      properties: "",
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
            id: [addressBookData.id],
            company: [addressBookData.name],
            address: [addressBookData.address],
            phone: [addressBookData.phone],
            email: [addressBookData.email],
            fax: [addressBookData.Fax],
            nation: [addressBookData.Country],
            note: [addressBookData.Note],
            properties: [addressBookData.Role],
          });
        }
      });
  }

  onSubmit(value) {
    let obj = this.listNation.find((item) => {
      return item.name.toLowerCase() == this.myForm.value.nation.toLowerCase();
    });
    let CountryID = "-1";
    if (obj) {
      CountryID = obj.id;
    }
    value["CountryID"] = CountryID;
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

  onClickCancel() {
    this.mService.publishPageRoute("address-book");
  }
}
