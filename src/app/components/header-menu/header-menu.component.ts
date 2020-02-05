import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  mData: any;

  showSearchBar = false;
  menuSelected = -1;

  constructor(
    public mService: AppModuleService,
    public router: Router
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.header;
    })
  }

  onClickSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  onClickMenu(index: number, indexChild: number) {
    if (index > 0 && indexChild > 0) {
      this.menuSelected = index
      if (index == 1) {
        if (index == 1 && indexChild == 1) {
          this.router.navigate(['contact-menu-contact']);
        }
        else if (index == 1 && indexChild == 2) {
          this.router.navigate(['contact-menu-company']);
        }
      } else if (index == 2) {
        if (index == 2 && indexChild == 1) {
          this.router.navigate(['task']);
        }
      }
    }
  }

  onClickLogo() {
    this.router.navigate(['dashboard']);
  }

}
