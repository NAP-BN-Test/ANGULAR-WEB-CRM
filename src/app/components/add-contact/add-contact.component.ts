import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  mData: any;

  gender = 1;

  btnAddExist = true;
  btnCanClicked = true;

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.add_sub_detail;
    })
  }

  onClickClose() {
    this.closeAddSub.emit()
  }

  onClickAddExist() {
    this.btnAddExist = true;
  }

  onClickAddNew() {
    this.btnAddExist = false;

  }

  onClickGenger(value) {
    this.gender = value;
  }

  onClickSave() {
    console.log(this.gender);

  }

}
