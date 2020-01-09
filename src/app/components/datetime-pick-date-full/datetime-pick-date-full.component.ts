import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datetime-pick-date-full',
  templateUrl: './datetime-pick-date-full.component.html',
  styleUrls: ['./datetime-pick-date-full.component.scss']
})
export class DatetimePickDateFullComponent implements OnInit {
  @Input('mDatetime') mTime = "";

  constructor() { }

  ngOnInit() {
  }

}
