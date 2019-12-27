import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mData: any;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {

    this.mService.LoadTitle(1).then(data => {
      this.mData = data;
    })
  }

}
