import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datetime-pick-date',
  templateUrl: './datetime-pick-date.component.html',
  styleUrls: ['./datetime-pick-date.component.scss']
})
export class DatetimePickDateComponent implements OnInit {

  @Input('mDate') mDate = "";

  @Output('pickDate') pickDate = new EventEmitter();

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
