import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Location } from '@angular/common';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, LOCAL_STORAGE_KEY, EVENT_PUSH, CLICK_DETAIL, MAIL_RESPONSE_TYPE, TIME_TYPE } from 'src/app/services/constant/app-constant';

import * as moment from 'moment';

@Component({
  selector: 'app-report-list-account',
  templateUrl: './report-list-account.component.html',
  styleUrls: ['./report-list-account.component.scss']
})
export class ReportListAccountComponent implements OnInit {
  //data for component table
  listTbData = {
    clickDetail: CLICK_DETAIL.MAIL_REPORT,
    listColum: [
      { name: 'Email', cell: 'email', type: -1 },

      { name: 'Ngày gửi', cell: 'time', type: MAIL_RESPONSE_TYPE.SEND },
      { name: 'Số lần gửi', cell: 'value', type: MAIL_RESPONSE_TYPE.SEND },

      { name: 'Ngày mở', cell: 'time', type: MAIL_RESPONSE_TYPE.OPEN },
      { name: 'Số lần mở', cell: 'value', type: MAIL_RESPONSE_TYPE.OPEN },

      { name: 'Ngày click', cell: 'time', type: MAIL_RESPONSE_TYPE.CLICK_LINK },
      { name: 'Số lần click', cell: 'value', type: MAIL_RESPONSE_TYPE.CLICK_LINK },

      { name: 'Ngày trả lại', cell: 'time', type: MAIL_RESPONSE_TYPE.INVALID },

      { name: 'Ngày hủy', cell: 'time', type: MAIL_RESPONSE_TYPE.UNSUBSCRIBE },
      { name: 'Lý do hủy', cell: 'reason', type: MAIL_RESPONSE_TYPE.UNSUBSCRIBE },
    ]
  };

  timeFrom = moment().add(-7, 'days').format('YYYY-MM-DD');
  timeTo = moment().format('YYYY-MM-DD HH:mm:ss');
  timeType = TIME_TYPE.DAY;

  mTitle: any;

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
    { data: [], label: 'Tổng số' }
  ];

  objSummary: any;
  objMailSend: any;
  objMailOpen: any;
  objMailClickLink: any;
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

    let reportTimeSelectJson = localStorage.getItem(LOCAL_STORAGE_KEY.REPORT_TIME_SELECT);
    if (reportTimeSelectJson) {
      let reportTimeSelect = JSON.parse(reportTimeSelectJson);
      this.timeFrom = reportTimeSelect.timeFrom;
      this.timeTo = reportTimeSelect.timeTo;
      this.timeType = reportTimeSelect.timeType;
    }

    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      this.tabIndex = params.tabIndex;

      this.onLoadData();
    }
    else {
      this.mService.publishPageRoute('login');
    }

  }

  onLoadData() {
    if (this.tabIndex == 0) this.onLoadDataSummary();
    else if (this.tabIndex == 1) this.onLoadMailSend();
    else if (this.tabIndex == 2) this.onLoadMailOpen();
    else if (this.tabIndex == 3) this.onLoadMailClickLink();
    else if (this.tabIndex == 4) this.onLoadMailInvalid();
    else if (this.tabIndex == 5) this.onLoadMailUnsubscribe();
  }

  onLoadDataSummary() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_SUMMARY().then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objSummary = data.obj;
        let percentOpen = Number(data.obj.percentType.replace('%', ''));

        this.pieChartData = [];
        this.pieChartData.push(percentOpen);
        this.pieChartData.push(100 - percentOpen);
      }
    })
  }

  onLoadMailSend() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_MAIL_TYPE(MAIL_RESPONSE_TYPE.SEND, this.timeType, this.timeFrom, this.timeTo).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailSend = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.time);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          mailResponseType: MAIL_RESPONSE_TYPE.SEND,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onLoadMailOpen() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_MAIL_TYPE(MAIL_RESPONSE_TYPE.OPEN, this.timeType, this.timeFrom, this.timeTo).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailOpen = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.time);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          mailResponseType: MAIL_RESPONSE_TYPE.OPEN,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onLoadMailClickLink() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_MAIL_TYPE(MAIL_RESPONSE_TYPE.CLICK_LINK, this.timeType, this.timeFrom, this.timeTo).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailClickLink = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.time);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          mailResponseType: MAIL_RESPONSE_TYPE.CLICK_LINK,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onLoadMailInvalid() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_MAIL_TYPE(MAIL_RESPONSE_TYPE.INVALID, this.timeType, this.timeFrom, this.timeTo).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailInvalid = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.time);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          mailResponseType: MAIL_RESPONSE_TYPE.INVALID,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onLoadMailUnsubscribe() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_MAIL_TYPE(MAIL_RESPONSE_TYPE.UNSUBSCRIBE, this.timeType, this.timeFrom, this.timeTo).then(data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailUnsubscribe = data.obj;

        let labels = [];
        let datas = [];

        data.array.forEach(item => {
          labels.push(item.time);
          datas.push(item.value);
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;

        this.mService.publishEvent(EVENT_PUSH.TABLE, {
          mailResponseType: MAIL_RESPONSE_TYPE.UNSUBSCRIBE,
          listData: data.arrayTableSort,
          listTbData: this.listTbData
        });
      }
    })
  }

  onTabChange(event) {

    if (event != undefined) {
      this.tabIndex = event;
      this.onLoadData();
    }

    let listParams = [
      { key: 'tabIndex', value: this.tabIndex }
    ];
    this.mService.handleParamsRoute(listParams);
  }


  onClickCell(event) {
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

  onSelectTime(event) {
    if (event) {
      this.timeFrom = event.timeFrom;
      this.timeTo = event.timeTo;
      this.timeType = event.timeType;
    }
    else {
      this.timeFrom = null;
      this.timeTo = null;
      this.timeType = TIME_TYPE.MONTH;
    }

    this.onLoadData();
  }
}
