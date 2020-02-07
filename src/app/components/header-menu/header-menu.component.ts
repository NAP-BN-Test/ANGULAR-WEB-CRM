import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Router, NavigationExtras } from '@angular/router';
import { DialogLogoutComponent } from '../dialog-logout/dialog-logout.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  mData: any;

  mUser: any;

  showSearchBar = false;
  menuSelected = -1;

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.header;
    });

    this.mUser = this.mService.getUser();

    console.log(this.mUser);
    
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
        else if (index == 2 && indexChild == 2) {
          this.router.navigate(['call']);
        }
        else if (index == 2 && indexChild == 3) {
          this.router.navigate(['email']);
        }
        else if (index == 2 && indexChild == 4) {
          this.router.navigate(['meet']);
        }
        else if (index == 2 && indexChild == 5) {
          this.router.navigate(['note']);
        }
      }
    }
  }

  onClickLogo() {
    this.router.navigate(['dashboard']);
  }

  onClickLogout() {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        localStorage.removeItem('user-login');
        this.router.navigate(['login']);
      }
    });
  }

}
