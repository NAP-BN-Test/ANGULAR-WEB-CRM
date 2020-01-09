import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datetime-pick-date',
  templateUrl: './datetime-pick-date.component.html',
  styleUrls: ['./datetime-pick-date.component.scss']
})
export class DatetimePickDateComponent implements OnInit {

  @Input('mDate') mDate = "";
  
  constructor() { }

  ngOnInit() {
  }

}
