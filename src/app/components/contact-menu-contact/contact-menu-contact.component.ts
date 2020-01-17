import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';
import { Utils } from 'src/app/services/core/app/utils';

@Component({
  selector: 'app-contact-menu-contact',
  templateUrl: './contact-menu-contact.component.html',
  styleUrls: ['./contact-menu-contact.component.scss']
})
export class ContactMenuContactComponent implements OnInit {

  listContact = [];
  listContactSummary = [];
  listContactCache = [];

  mData: any;

  menuSelected = 0;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  page = 1;
  pageSize = 12;
  collectionSize = 0;

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.contact;
    });

    this.onLoadData();
  }

  onLoadData(type?: number) {
    this.mService.getApiService().sendRequestGET_LIST_CONTACT_FULL(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      type
    ).then(data => {

      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listContact = data.array;
        this.listContactSummary = data.array;
        this.listContactCache = data.array;
      }
    })
  }

  get listContactSort(): Array<any> {
    this.collectionSize = this.listContact.length;
    return this.listContact
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  get contactInfo(): any {
    let all = 0;
    let mine = 0;
    let other = 0;

    this.listContactSummary.forEach(item => {
      all += 1;
      if (item.ownerID == this.mService.getUser().id)
        mine += 1;
      if (!item.companyID)
        other += 1;
    });

    return { all, mine, other };
  }


  pow = 0;
  onSort() {
    this.pow += 1;

    this.listContact = this.listContact.sort((a, b) => {
      if (a.name > b.name) return Math.pow(-1, this.pow);
      if (a.name < b.name) return Math.pow(-1, this.pow + 1);
      return 0;
    })
  }

  onClickMenu(index: number) {
    this.menuSelected = index;
    if (index == 1) {
      this.listContact = this.listContactCache.filter(item => {
        return item.ownerID === this.mService.getUser().id;
      });
    } else if (index == 2) {
      this.listContact = this.listContactCache.filter(item => {
        return item.companyID === null;
      });
    }

  }

  onCheckBoxChange(item) {
    let index = this.listContact.findIndex(it => {
      return it.id == item.id;
    });

    if (index > -1) {
      this.listContact[index].checked = !this.listContact[index].checked;
    }

    let value = this.listContact[index].checked ? 2 : 0;

    this.numberOfItemSelected = 0;

    this.listContactSort.forEach(it => {
      if (it.checked) this.numberOfItemSelected += 1;

      if (!it.checked && value == 0) value = 0;
      else if (!it.checked && value == 2) value = 1;
      else if (it.checked && value == 0) value = 1;
      else if (it.checked && value == 2) value = 2;
      else value = 1;
    });

    if (value == 0) {
      this.checked = false;
      this.indeterminate = false
    }
    else if (value == 1) {
      this.indeterminate = true;
    }
    else if (value == 2) {
      this.checked = true;
      this.indeterminate = false;
    }

  }

  onCheckAllChange() {
    this.numberOfItemSelected = 0;

    if (this.checked) {
      this.listContact.forEach(item => {
        item.checked = false;
      })
    }
    else {
      this.listContactSort.forEach(it => {
        let obj = this.listContact.find(it1 => {
          return it1.id == it.id;
        });
        obj.checked = true;
        this.numberOfItemSelected += 1;
      })
    }
  }

  onClickPagination() {
    this.checked = false;
    this.listContact.forEach(item => {
      item.checked = false;
    })
  }

  onSearchChange(event) {
    let searchKey = event.target.value;
    this.listContact = this.listContactCache.filter(item => {
      return Utils.bodauTiengViet(item.name).includes(Utils.bodauTiengViet(searchKey)) || item.handPhone.includes(searchKey);
    })
  }

  onClickItem(item) {
    // this.router.navigate(['home']);
  }

}
