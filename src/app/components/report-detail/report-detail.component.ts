import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Location } from '@angular/common';
import { AppModuleService } from 'src/app/services/app-module.service';
import { async } from '@angular/core/testing';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  menuIndex = 1;

  mTitle: any;

  daies = 15;

  campainID = -1;

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

  constructor(
    private location: Location,
    public mService: AppModuleService,
    private cookieService: CookieService

  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.email;
    });

    this.campainID = this.cookieService.get('campain-id') ? Number(this.cookieService.get('campain-id')) : -1;

    this.onLoadDataSummary();
  }

  onLoadDataSummary() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_CAMPAIN_SUMMARY(this.campainID).then(async data => {
      
      if (data.status == STATUS.SUCCESS) {

        this.objSummary = data.obj;

        let percentOpen = Number(data.obj.percentOpen.replace('%', ''));

        this.pieChartData = [];
        this.pieChartData.push(percentOpen);
        this.pieChartData.push(100 - percentOpen);
      }
    })
  }

  tbMailOpen = [];
  onLoadMailOpen() {
    this.mService.getApiService().sendRequestGET_REPORT_BY_CAMPAIN_OPEN_MAIL(this.campainID, this.daies).then(async data => {
      if (data.status == STATUS.SUCCESS) {

        this.objMailOpen = data.obj;

        let labels = [];
        let datas = [];

        this.tbMailOpen = [];
        data.array.forEach(item => {
          labels.push(item.date);
          datas.push(item.value);

          if (item.value > 0) {
            this.tbMailOpen.push({
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
      this.onLoadMailOpen();
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

  onSelectChange() {
    this.onLoadMailOpen();
  }

}
