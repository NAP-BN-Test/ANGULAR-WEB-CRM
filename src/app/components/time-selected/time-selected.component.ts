import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSelect, MatInput } from '@angular/material';

import * as moment from 'moment';
import { AppModuleService } from 'src/app/services/app-module.service';
import { TIME_SELECT, TIME_TYPE, LOCAL_STORAGE_KEY } from 'src/app/services/constant/app-constant';


@Component({
  selector: 'app-time-selected',
  templateUrl: './time-selected.component.html',
  styleUrls: ['./time-selected.component.scss']
})
export class TimeSelectedComponent implements OnInit {
  @ViewChild('dateStartInput', { read: MatInput }) dateStartInput: MatInput;
  @ViewChild('dateEndInput', { read: MatInput }) dateEndInput: MatInput;

  @ViewChild('timeSelect', { read: MatSelect }) timeSelect: MatSelect;


  @Output('selectTime') selectTime = new EventEmitter();


  listTimeOption = [
    { value: TIME_SELECT.TODAY, name: "Hôm nay" },
    { value: TIME_SELECT.YESTERDAY, name: "Hôm qua" },
    { value: TIME_SELECT.LAST_24H, name: "24 giờ trước" },
    { value: TIME_SELECT.LAST_7DAY, name: "7 ngày trước" },
    { value: TIME_SELECT.LAST_30DAY, name: "30 ngày trước" },
    { value: TIME_SELECT.THIS_MONTH, name: "Tháng này" },
    { value: TIME_SELECT.LAST_MONTH, name: "Tháng trước" },
    { value: TIME_SELECT.ALL_TIME, name: "Toàn bộ thời gian" },
    { value: TIME_SELECT.SELECT, name: "Tùy chỉnh" }
  ];

  isTimeSelect = false;
  selectTimeIndex = 0;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {

      let reportTimeSelectJson = localStorage.getItem(LOCAL_STORAGE_KEY.REPORT_TIME_SELECT);
      let reportTimeSelect;
      if (reportTimeSelectJson) reportTimeSelect = JSON.parse(reportTimeSelectJson);
      else
        reportTimeSelect = {
          timeFrom: moment().add(-7, 'days').format("YYYY-MM-DD"),
          timeTo: moment().format("YYYY-MM-DD HH:mm:ss"),
          timeType: TIME_TYPE.DAY,
          timeSelect: TIME_SELECT.LAST_7DAY
        }

      this.timeSelect.value = reportTimeSelect.timeSelect;
      this.selectTimeIndex = reportTimeSelect.timeSelect;
      this.isTimeSelect = this.selectTimeIndex == TIME_SELECT.SELECT;

      if (reportTimeSelect.timeSelect == TIME_SELECT.SELECT) {
        this.dateStartInput.value = reportTimeSelect.timeFrom;
        this.dateEndInput.value = moment(reportTimeSelect.timeTo).format("YYYY-MM-DD");
      }

    }, 200);
  }

  onSelectTimeChange(event) {
    if (event) {
      this.selectTimeIndex = event.value
      this.isTimeSelect = event.value == TIME_SELECT.SELECT;
    }
  }

  onClickGo() {
    let handle;

    if (this.isTimeSelect) {
      if (!this.dateStartInput.value) {
        this.mService.showSnackBar("Chưa chọn thời gian bắt đầu!");
      } else if (!this.dateEndInput.value) {
        this.mService.showSnackBar("Chưa chọn thời gian kết thúc!");
      } else if (moment(this.dateEndInput.value).valueOf() <= moment(this.dateStartInput.value).valueOf()) {
        this.mService.showSnackBar("Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu!");
      } else {
        let timeFromMoment = moment(this.dateStartInput.value);
        let timeToMoment = moment(this.dateEndInput.value);

        let timeType;
        let timeSpan = timeToMoment.valueOf() - timeFromMoment.valueOf();
        if (timeSpan <= 86400000)
          timeType = TIME_TYPE.HOUR;
        else if (timeSpan > 86400000 && timeSpan <= 604800000)
          timeType = TIME_TYPE.DAY;
        else if (timeSpan > 604800000 && timeSpan <= 2592000000)
          timeType = TIME_TYPE.DATE;
        else
          timeType = TIME_TYPE.MONTH;

        handle = {
          timeFrom: timeFromMoment.format("YYYY-MM-DD"),
          timeTo: timeToMoment.format("YYYY-MM-DD") + " 23:59:59",
          timeType,
          timeSelect: TIME_SELECT.SELECT
        }
        this.selectTime.emit(handle);
      }
    } else {
      handle = this.mService.handleReportTimeSelect(this.isTimeSelect, this.selectTimeIndex);
      this.selectTime.emit(handle);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY.REPORT_TIME_SELECT, JSON.stringify(handle));
  }
}
