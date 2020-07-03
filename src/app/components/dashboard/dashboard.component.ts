import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mTitle: any;

  listActivity = [];
  activitySummary: any;

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.dashboard;
    });

    this.mService.getApiService().sendRequestGET_SUMMARY_INFO(
      
      
    ).then(data => {
      this.listActivity = data.array;
      this.activitySummary = data.activitySummary
    })
  }

  onClickActivity(item) {
    if (item.type == 1) {
      this.router.navigate(['company-detail'], { state: { params: item } });
    } else if (item.type == 2) {
      this.router.navigate(['contact-detail'], { state: { params: item } });
    }
  }

}
