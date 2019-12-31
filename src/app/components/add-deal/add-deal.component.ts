import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.scss']
})
export class AddDealComponent implements OnInit {

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  mData: any;

  model ="2020-01-01";

  gender = 1;

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

  onClickGenger(value) {
    this.gender = value;
  }

  onClickSave() {
    console.log(this.gender);

  }

}
