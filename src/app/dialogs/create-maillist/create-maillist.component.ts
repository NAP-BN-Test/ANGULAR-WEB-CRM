import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-maillist',
  templateUrl: './create-maillist.component.html',
  styleUrls: ['./create-maillist.component.scss']
})
export class CreateMaillistComponent implements OnInit {

  mailListName = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
