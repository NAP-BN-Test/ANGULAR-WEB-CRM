import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-company-sub-detail',
  templateUrl: './company-sub-detail.component.html',
  styleUrls: ['./company-sub-detail.component.scss']
})
export class CompanySubDetailComponent implements OnInit {

  @Output('addSubDetail') addSubDetail = new EventEmitter();

  mData: any;

  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.company_sub_detail;
    })
  }

  onClickAddSubDetail(index: number) {
    this.addSubDetail.emit(index);
  }

}
