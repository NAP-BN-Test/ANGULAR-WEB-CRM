import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mData: any;

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

  ngOnInit() {

    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.login;
    })
  }

  onClickLogin() {
    this.router.navigate(['home']);
  }

}
