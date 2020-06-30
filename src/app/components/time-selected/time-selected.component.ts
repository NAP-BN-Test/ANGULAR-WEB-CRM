import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSelect, MatInput } from '@angular/material';

import * as moment from 'moment';
import { AppModuleService } from 'src/app/services/app-module.service';
import { TIME_SELECT, TIME_TYPE } from 'src/app/services/constant/app-constant';


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
      this.timeSelect.value = TIME_SELECT.LAST_7DAY;
    }, 200);
  }

  onSelectTimeChange(event) {
    if (event) {
      this.selectTimeIndex = event.value
      this.isTimeSelect = event.value == 9;
    }
  }

  onClickGo() {
    if (this.isTimeSelect) {
      if (!this.dateStartInput.value) {
        this.mService.showSnackBar("Chưa chọn thời gian bắt đầu!");
      } else if (!this.dateEndInput.value) {
        this.mService.showSnackBar("Chưa chọn thời gian kết thúc!");
      } else if (moment(this.dateEndInput.value).valueOf() <= moment(this.dateStartInput.value).valueOf()) {
        this.mService.showSnackBar("Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu!");
      } else {
        let timeFrom = toDate(this.dateStartInput.value);
        let timeTo = toDate(this.dateEndInput.value, true);

        this.selectTime.emit({ timeFrom, timeTo })
      }
    } else {
      let now = moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.selectTimeIndex == TIME_SELECT.TODAY) {
        this.selectTime.emit({
          timeFrom: moment().format("YYYY-MM-DD"),
          timeTo: now,
          timeType: TIME_TYPE.HOUR
        })
      } else if (this.selectTimeIndex == TIME_SELECT.YESTERDAY) {
        let yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");
        this.selectTime.emit({
          timeFrom: yesterday,
          timeTo: yesterday + " 23:59:59",
          timeType: TIME_TYPE.HOUR
        })
      } else if (this.selectTimeIndex == TIME_SELECT.LAST_24H) {
        this.selectTime.emit({
          timeFrom: moment().add(-24, 'hours').format("YYYY-MM-DD HH:mm:ss"),
          timeTo: now,
          timeType: TIME_TYPE.HOUR
        })
      } else if (this.selectTimeIndex == TIME_SELECT.LAST_7DAY) {
        this.selectTime.emit({
          timeFrom: moment().add(-7, 'days').format("YYYY-MM-DD"),
          timeTo: now,
          timeType: TIME_TYPE.DAY
        })
      } else if (this.selectTimeIndex == TIME_SELECT.LAST_30DAY) {
        this.selectTime.emit({
          timeFrom: moment().add(-30, 'days').format("YYYY-MM-DD"),
          timeTo: now,
          timeType: TIME_TYPE.DATE
        })
      } else if (this.selectTimeIndex == TIME_SELECT.THIS_MONTH) {
        let thisMonth = moment().format("YYYY-MM");
        this.selectTime.emit({
          timeFrom: thisMonth + "-01",
          timeTo: now,
          timeType: TIME_TYPE.DATE
        })
      } else if (this.selectTimeIndex == TIME_SELECT.LAST_MONTH) {
        let lastMonth = moment().add(-1, 'months').format("YYYY-MM");
        let dayInMonth = moment().add(-1, 'months').daysInMonth();
        this.selectTime.emit({
          timeFrom: lastMonth + "-01",
          timeTo: lastMonth + "-" + dayInMonth + " 23:59:59",
          timeType: TIME_TYPE.DATE
        })
      } else {
        this.selectTime.emit();
      }
    }
  }
}

function toDate(time, end?: boolean): string {
  if (time) {
    if (end) {
      return moment(time).format("YYYY-MM-DD") + " 23:59:59";
    } else {
      return moment(time).format("YYYY-MM-DD");
    }
  }
  else return null;
}
