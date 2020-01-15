import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datetime-pick-time',
  templateUrl: './datetime-pick-time.component.html',
  styleUrls: ['./datetime-pick-time.component.scss']
})
export class DatetimePickTimeComponent implements OnInit {
  @Input('mTime') mTime = "00:00";
  @Output('pickTime') pickTime = new EventEmitter();

  listTime = [
    { name: "05:00 AM", value: "05:00" },
    { name: "05:15 AM", value: "05:15" },
    { name: "05:30 AM", value: "05:30" },
    { name: "05:45 AM", value: "05:45" },
    { name: "06:00 AM", value: "06:00" },
    { name: "06:15 AM", value: "06:15" },
    { name: "06:30 AM", value: "06:30" },
    { name: "06:45 AM", value: "06:45" },
    { name: "07:00 AM", value: "07:00" },
    { name: "07:15 AM", value: "07:15" },
    { name: "07:30 AM", value: "07:30" },
    { name: "07:45 AM", value: "07:45" },
    { name: "08:00 AM", value: "08:00" },
    { name: "08:15 AM", value: "08:15" },
    { name: "08:30 AM", value: "08:30" },
    { name: "08:45 AM", value: "08:45" },
    { name: "09:00 AM", value: "09:00" },
    { name: "09:15 AM", value: "09:15" },
    { name: "09:30 AM", value: "09:30" },
    { name: "09:45 AM", value: "09:45" },
    { name: "10:00 AM", value: "10:00" },
    { name: "10:15 AM", value: "10:15" },
    { name: "10:30 AM", value: "10:30" },
    { name: "10:45 AM", value: "10:45" },
    { name: "11:00 AM", value: "11:00" },
    { name: "11:15 AM", value: "11:15" },
    { name: "11:30 AM", value: "11:30" },
    { name: "11:45 AM", value: "11:45" },
    { name: "12:00 AM", value: "12:00" },
    { name: "12:15 AM", value: "12:15" },
    { name: "12:30 AM", value: "12:30" },
    { name: "12:45 AM", value: "12:45" },
    { name: "01:00 PM", value: "13:00" },
    { name: "01:15 PM", value: "13:15" },
    { name: "01:30 PM", value: "13:30" },
    { name: "01:45 PM", value: "13:45" },
    { name: "02:00 PM", value: "14:00" },
    { name: "02:15 PM", value: "14:15" },
    { name: "02:30 PM", value: "14:30" },
    { name: "02:45 PM", value: "14:45" },
    { name: "03:00 PM", value: "15:00" },
    { name: "03:15 PM", value: "15:15" },
    { name: "03:30 PM", value: "15:30" },
    { name: "03:45 PM", value: "15:45" },
    { name: "04:00 PM", value: "16:00" },
    { name: "04:15 PM", value: "16:15" },
    { name: "04:30 PM", value: "16:30" },
    { name: "04:45 PM", value: "16:45" },
    { name: "05:00 PM", value: "17:00" },
    { name: "05:15 PM", value: "17:15" },
    { name: "05:30 PM", value: "17:30" },
    { name: "05:45 PM", value: "17:45" },
    { name: "06:00 PM", value: "18:00" },
    { name: "06:15 PM", value: "18:15" },
    { name: "06:30 PM", value: "18:30" },
    { name: "06:45 PM", value: "18:45" },
    { name: "07:00 PM", value: "19:00" },
    { name: "07:15 PM", value: "19:15" },
    { name: "07:30 PM", value: "19:30" },
    { name: "07:45 PM", value: "19:45" },
    { name: "08:00 PM", value: "20:00" },
    { name: "08:15 PM", value: "20:15" },
    { name: "08:30 PM", value: "20:30" },
    { name: "08:45 PM", value: "20:45" },
    { name: "09:00 PM", value: "21:00" },
    { name: "09:15 PM", value: "21:15" },
    { name: "09:30 PM", value: "21:30" },
    { name: "09:45 PM", value: "21:45" },
    { name: "10:00 PM", value: "22:00" },
    { name: "10:15 PM", value: "22:15" },
    { name: "10:30 PM", value: "22:30" },
    { name: "10:45 PM", value: "22:45" },
    { name: "11:00 PM", value: "23:00" },
    { name: "11:15 PM", value: "23:15" },
    { name: "11:30 PM", value: "23:30" },
    { name: "11:45 PM", value: "23:45" },
    { name: "00:00 AM", value: "00:00" },
  ]
  constructor() { }

  ngOnInit() {
    
  }

  onChange() {
    this.pickTime.emit(this.mTime);
  }

}
