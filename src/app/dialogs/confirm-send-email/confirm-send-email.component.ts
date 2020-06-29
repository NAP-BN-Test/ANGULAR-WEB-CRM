import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-send-email',
  templateUrl: './confirm-send-email.component.html',
  styleUrls: ['./confirm-send-email.component.scss']
})
export class ConfirmSendEmailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public mData: any
  ) { }

  ngOnInit(): void {
  }

}
