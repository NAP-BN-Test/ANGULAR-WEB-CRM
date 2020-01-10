import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';
import { ParamsKey } from 'src/app/services/constant/paramskey';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-contact-menu-company',
  templateUrl: './contact-menu-company.component.html',
  styleUrls: ['./contact-menu-company.component.scss']
})
export class ContactMenuCompanyComponent implements OnInit {

  listData = [];

  mData: any;

  menuSelected = 1;

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
    this.mService.getApiService().sendRequestGET_LIST_COMPANY(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data[ParamsKey.STATUS] == STATUS.SUCCESS) {
        this.listData = data.array;
        this.collectionSize = this.listData.length;
      }
    });

  }

  get listDataSort(): Array<any> {
    return this.listData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  pow = 0;
  onSort() {
    this.pow += 1;

    this.listData = this.listData.sort((a, b) => {
      if (a.name > b.name) return Math.pow(-1, this.pow);
      if (a.name < b.name) return Math.pow(-1, this.pow + 1);
      return 0;
    })
  }

  onClickMenu(index: number) {
    this.menuSelected = index;
  }

  onCheckBoxChange(item) {
    let index = this.listData.findIndex(it => {
      return it.id == item.id;
    });

    if (index > -1) {
      this.listData[index].checked = !this.listData[index].checked;
    }

    let value = this.listData[index].checked ? 2 : 0;

    this.numberOfItemSelected = 0;

    this.listDataSort.forEach(it => {
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
      this.listData.forEach(item => {
        item.checked = false;
      })
    }
    else {
      this.listDataSort.forEach(it => {
        let obj = this.listData.find(it1 => {
          return it1.id == it.id;
        });
        obj.checked = true;
        this.numberOfItemSelected += 1;
      })
    }
  }

  onClickPagination() {
    this.checked = false;
    this.listData.forEach(item => {
      item.checked = false;
    })
  }

  onClickItem(item) {
    this.router.navigate(['home'], { state: { params: item.id } });
  }

}
