import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-datetime-pick-date-full',
  templateUrl: './datetime-pick-date-full.component.html',
  styleUrls: ['./datetime-pick-date-full.component.scss']
})
export class DatetimePickDateFullComponent implements OnInit {

  @Output('pickDate') pickDate = new EventEmitter();

  mDate = moment.utc().format("YYYY-MM-DD");

  constructor() { }

  ngOnInit() {
  }

  onDateSelect(event) {
    let date = event.year + "-" + event.month + "-" + event.day;
    this.pickDate.emit(date)
  }

  onChange(event) {
    this.pickDate.emit(event.target.value);
  }

}
