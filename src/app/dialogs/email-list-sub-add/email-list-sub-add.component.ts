import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-list-sub-add',
  templateUrl: './email-list-sub-add.component.html',
  styleUrls: ['./email-list-sub-add.component.scss']
})
export class EmailListSubAddComponent implements OnInit {

  mObj = {
    name: "",
    email: ""
  }

  constructor() { }

  ngOnInit(): void { }

}
