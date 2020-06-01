import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Location } from '@angular/common';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-report-detail-account',
  templateUrl: './report-detail-account.component.html',
  styleUrls: ['./report-detail-account.component.scss']
})
export class ReportDetailAccountComponent implements OnInit {

  menuIndex = 1;
  mData: any;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Đã mở'], ['Không được mở']];
  public pieChartData: SingleDataSet = [60, 40];
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

  constructor(
    private location: Location,
    public mService: AppModuleService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.email;
    });

    this.onLoadDataSummary();
  }

  onLoadDataSummary() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_SUMMARY().then(async data => {
      if (data.status == STATUS.SUCCESS) {
        this.objSummary = data.obj;

        this.pieChartData = [];
        this.pieChartData.push(data.obj.openMailCount);
        this.pieChartData.push(data.obj.mailSend - data.obj.openMailCount);
      }
    })
  }

  tbMailSend = [];
  onLoadMailSend() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_USER_MAIL_SEND().then(async data => {
      if (data.status == STATUS.SUCCESS) {

        let labels = [];
        let datas = [];
        data.array.forEach(item => {
          labels.push(item.date);
          datas.push(item.value);

          if (item.value > 0) {
            this.tbMailSend.push({
              date: item.date,
              total: item.value
            })
          }
        });
        this.barChartLabels = labels;
        this.barChartData[0].data = datas;
      }
    })
  }

  onClickMenu(index) {
    this.menuIndex = index;

    if (index == 1) {
      this.onLoadDataSummary();
    }
    else if (index == 2) {
      this.onLoadMailSend();
    }
    else if (index == 2) {
    }
    else if (index == 2) {
    }
    else if (index == 2) {
    }
    else if (index == 2) {
    }
  }

  onClickBack() {
    this.location.back();
  }

}
