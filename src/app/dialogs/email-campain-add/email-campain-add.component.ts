import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-email-campain-add',
  templateUrl: './email-campain-add.component.html',
  styleUrls: ['./email-campain-add.component.scss']
})
export class EmailCampainAddComponent implements OnInit {

  mObj = {
    name: "",
    subject: "",
    mailListID: -1
  }
  listContact = [];

  listMailList = [];

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit(): void {
    this.mService.getApiService().sendRequestGET_MAIL_LIST_OPTION().then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listMailList = data.array;
    })
  }

}