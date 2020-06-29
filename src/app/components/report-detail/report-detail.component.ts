import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Location } from '@angular/common';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, LOCAL_STORAGE_KEY, EVENT_PUSH, CLICK_DETAIL, REPORT_TYPE } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_REPORT,
    listColum: [
      { name: 'Email', cell: 'email' },
      { name: 'Ngày gửi', cell: 'date' },
      { name: 'Số lần gửi', cell: 'value' }
    ]
  };

  mTitle: any;

  daies = 15;

  campainID = -1;
  tabIndex: number = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Đã mở'], ['Không được mở']];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];

  barChartType: ChartType = 'bar';

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Tổng số lượt mở' }
  ];

  objSummary: any;
  objMailOpen: any;
  objMailInvalid: any;
  objMailUnsubscribe: any;

  constructor(
    private location: Location,
    public mService: AppModuleService,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);

    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.campainID = params.campainID;
      this.tabIndex = params.tabIndex;

      this.onLoadData();
    }
    else {
      this.mService.publishPageRoute('login');
    }
  }

  onLoadData() {
    if (this.tabIndex == 0) this.onLoadDataSummary();
    else if (this.tabIndex == 1) this.onLoadMailOpen();
    else if (this.tabIndex == 3) this.onLoadMailInvalid();
    else if (this.tabIndex == 4) this.onLoadMailUnsubscribe();
  }

  onLoadDataSummary() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_CAMPAIN_SUMMARY(this.campainID).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objSummary = data.obj;

        let percentOpen = Number(data.obj.percentOpen.replace('%', ''));

        this.pieChartData = [];
        this.pieChartData.push(percentOpen);
        this.pieChartData.push(100 - percentOpen);
      }
    })
  }

  onLoadMailOpen() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_CAMPAIN_OPEN_MAIL(this.campainID, this.daies).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailOpen = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.date);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: 1,
          collectionSize: data.arrayTableSort.length,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onLoadMailInvalid() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_CAMPAIN_INVALID_MAIL(this.campainID, this.daies).then(data => {
      if (data.status == STATUS.SUCCESS) {

        console.log(data);

        this.objMailInvalid = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.date);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          page: 1,
          collectionSize: data.arrayTableSort.length,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onLoadMailUnsubscribe() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_CAMPAIN_UNSUBSCRIBE_MAIL(this.campainID, this.daies).then(data => {
      if (data.status == STATUS.SUCCESS) {

        console.log(data);

        this.objMailUnsubscribe = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.date);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.listTbData.listColum.push({ name: 'Lý do', cell: 'reason' })
        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onTabChange(event) {
    if (event) this.tabIndex = event;

    let listParams = [
      { key: 'campainID', value: this.campainID },
      { key: 'tabIndex', value: this.tabIndex }
    ];
    this.mService.handleParamsRoute(listParams);
  }

  onClickCell(event) {
    console.log(event);

    if (event) {
      if (event.clickDetail == CLICK_DETAIL.MAIL_REPORT) {
        this.mService.publishPageRoute('email-list-sub-report', { mailListID: event.data.mailListID, email: event.data.email, page: 1 });
      }
    }
  }

  onClickBack() {
    this.location.back();
  }

  onSelectChange() {
    this.onLoadMailOpen();
  }

}
