import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  mData: any;

  gender = 1;

  btnType = 1;
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

  onClickAdd(index: number) {
    if (index)
      this.btnType = index;
  }

  onClickGenger(value) {
    this.gender = value;
  }

  onClickSave() {
    console.log(this.gender);

  }

}
