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

  language = "Tiếng Việt";

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    if (localStorage.getItem('language-key') == "VI") {
      this.language = "English";
    } else {
      this.language = "Tiếng Việt";
    }

    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.header;
    });

    this.mUser = this.mService.getUser();

  }

  onClickSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  onClickMenu(index: number, indexChild: number) {
    if (index > 0 && indexChild > 0) {
      this.menuSelected = index
      if (index == 1) {
        if (indexChild == 1) {
          this.router.navigate(['contact-menu-contact']);
        }
        else if (indexChild == 2) {
          this.router.navigate(['contact-menu-company'], { queryParams: { page: 1 } });
        }
        else if (indexChild == 3) {
          this.router.navigate(['logistic_company'], { queryParams: { page: 1 } });
        }
        else if (indexChild == 4) {
          this.router.navigate(['trasport_company'], { queryParams: { page: 1 } });
        }
      }
      else if (index == 2) {
        if (indexChild == 1) {
          this.router.navigate(['task']);
        }
        else if (indexChild == 2) {
          this.router.navigate(['call']);
        }
        else if (indexChild == 3) {
          this.router.navigate(['email']);
        }
        else if (indexChild == 4) {
          this.router.navigate(['meet']);
        }
        else if (indexChild == 5) {
          this.router.navigate(['note']);
        }
      }
      else if (index == 3) {
        if (indexChild == 1) {
          this.router.navigate(['email-list']);
        } else if (indexChild == 2) {
          this.router.navigate(['email-campain']);
        }
      }
      else if (index == 4) {
        if (indexChild == 1) {
          this.router.navigate(['report-list']);
        } else if (indexChild == 2) {
          this.router.navigate(['report-list-account']);
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

  onClickLanguage() {

    if (localStorage.getItem('language-key') == "VI") {
      this.language = "Tiếng Việt";
      localStorage.setItem('language-key', "EN");

      this.mService.LoadTitle("EN").then(data => {
        localStorage.setItem('data-local', JSON.stringify(data))
      })

    } else {
      this.language = "English";
      localStorage.setItem('language-key', "VI");

      this.mService.LoadTitle("VI").then(data => {
        localStorage.setItem('data-local', JSON.stringify(data))
      })
    }

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    })
  }

  onClickAddUser() {
    this.router.navigate(['add-user']);
  }

}
