import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {

  menuIndex = 1;

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
  barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  barChartType: ChartType = 'bar';

  barChartData: ChartDataSets[] = [
    { data: [1, 0, 0, 3, 0, 0], label: 'Tổng số lượt mở' }
  ];

  constructor(
    private location: Location
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
  }

  onLoadData() {
    
  }

  onClickMenu(index) {
    this.menuIndex = index;
  }

  onClickBack() {
    this.location.back();
  }

}
