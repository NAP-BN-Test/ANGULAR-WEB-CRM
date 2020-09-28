import { Component, OnInit, Input } from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";
import { Router } from "@angular/router";
import { DialogLogoutComponent } from "../../dialogs/dialog-logout/dialog-logout.component";
import { MatDialog } from "@angular/material";
import {
  LOCAL_STORAGE_KEY,
  STATUS,
} from "src/app/services/constant/app-constant";
import { AddUserComponent } from "src/app/dialogs/add-user/add-user.component";

@Component({
  selector: "app-header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"],
})
export class HeaderMenuComponent implements OnInit {
  @Input("menuIndex") menuIndex = 1;

  mTitle: any;

  listMenu: any;

  mUser: any;

  showSearchBar = false;

  language = "Tiếng Việt";

  constructor(
    public mService: AppModuleService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_KEY) == "EN") {
      this.language = "English";
    } else {
      this.language = "Tiếng Việt";
    }

    this.mService.LoadAppConfig();

    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
    let menuTitle = this.mTitle.menu_title;

    this.listMenu = [
      {
        index: 1,
        name: menuTitle.contact,
        list: [
          { index: 1, name: menuTitle.contact },
          { index: 2, name: menuTitle.company },
        ],
      },
      {
        index: 2,
        name: menuTitle.action,
        list: [
          { index: 1, name: menuTitle.task },
          { index: 2, name: menuTitle.call },
          { index: 3, name: menuTitle.email },
          { index: 4, name: menuTitle.meet },
          { index: 5, name: menuTitle.note },
        ],
      },
      {
        index: 7,
        name: menuTitle.address_book,
        list: [{ index: 1, name: menuTitle.address_book }],
      },
      {
        index: 8,
        name: "Sales",
        list: [
          { index: 1, name: "Booking" },
          { index: 2, name: "Selling" },
          { index: 3, name: "Buying" },
          { index: 4, name: "Work order" },
        ],
      },
      {
        index: 3,
        name: menuTitle.email,
        list: [
          { index: 1, name: menuTitle.mail_list },
          { index: 2, name: menuTitle.mail_campain },
        ],
      },
      {
        index: 6,
        name: menuTitle.mailmerge_campaign_list,
        list: [
          { index: 1, name: menuTitle.mailmerge_campaign_list },
          { index: 2, name: menuTitle.mailmerge_template_list },
        ],
      },
      {
        index: 4,
        name: menuTitle.report,
        list: [
          { index: 1, name: menuTitle.report_by_campain },
          { index: 2, name: menuTitle.report_by_maillist },
          { index: 3, name: menuTitle.report_by_user },
        ],
      },
      {
        index: 5,
        name: menuTitle.category,
        list: [
          { index: 1, name: menuTitle.city },
          { index: 2, name: menuTitle.step },
          { index: 3, name: menuTitle.country },
          { index: 4, name: menuTitle.job_tile },
          { index: 5, name: menuTitle.call_outcome },
          { index: 6, name: menuTitle.mail_outcome },
        ],
      },
    ];

    this.mUser = this.mService.getUser();
  }

  onClickSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  onClickMenu(index: number, indexChild: number) {
    if (index > 0 && indexChild > 0) {
      if (index == 1) {
        if (indexChild == 1) {
          this.router.navigate(["contacts"], {
            queryParams: { menu: 1, page: 1 },
          });
        } else if (indexChild == 2) {
          this.router.navigate(["companies"], {
            queryParams: { menu: 1, page: 1 },
          });
        }
        // else if (indexChild == 3) {
        //   this.router.navigate(['logistic_company'], { queryParams: { menu: 1, page: 1 } });
        // }
        // else if (indexChild == 4) {
        //   this.router.navigate(['trasport_company'], { queryParams: { menu: 1, page: 1 } });
        // }
      } else if (index == 2) {
        if (indexChild == 1) {
          this.router.navigate(["task"], { queryParams: { page: 1 } });
        } else if (indexChild == 2) {
          this.router.navigate(["call"], { queryParams: { page: 1 } });
        } else if (indexChild == 3) {
          this.router.navigate(["email"], { queryParams: { page: 1 } });
        } else if (indexChild == 4) {
          this.router.navigate(["meet"], { queryParams: { page: 1 } });
        } else if (indexChild == 5) {
          this.router.navigate(["note"], { queryParams: { page: 1 } });
        }
      } else if (index == 3) {
        if (indexChild == 1) {
          this.router.navigate(["email-list"], { queryParams: { page: 1 } });
        } else if (indexChild == 2) {
          this.router.navigate(["email-campain"], { queryParams: { page: 1 } });
        }
      } else if (index == 4) {
        if (indexChild == 1) {
          this.router.navigate(["report-list"], { queryParams: { page: 1 } });
        } else if (indexChild == 2) {
          this.router.navigate(["report-list-maillist"], {
            queryParams: { page: 1 },
          });
        } else if (indexChild == 3) {
          this.router.navigate(["report-list-account"], {
            queryParams: { tabIndex: 0 },
          });
        }
      } else if (index == 5) {
        if (indexChild == 1) {
          this.router.navigate(["category-city"]);
        } else if (indexChild == 2) {
          this.router.navigate(["category-step"]);
        } else if (indexChild == 3) {
          this.router.navigate(["category-country"]);
        } else if (indexChild == 4) {
          this.router.navigate(["job-tile"]);
        } else if (indexChild == 5) {
          this.router.navigate(["call-outcome"]);
        } else if (indexChild == 6) {
          this.router.navigate(["mail-outcome"]);
        }
      } else if (index == 6) {
        if (indexChild == 1) {
          this.router.navigate(["mailmerge-campaign-list"]);
        } else if (indexChild == 2) {
          this.router.navigate(["mailmerge-template-list"]);
        }
      } else if (index == 7) {
        if (indexChild == 1) {
          this.router.navigate(["address-book"]);
        }
      } else if (index == 8) {
        if (indexChild == 2) {
          this.router.navigate(["sales-selling"]);
        }
      }
    }
  }

  onClickLogo() {
    // this.router.navigate(['dashboard']);
  }

  onClickLogout() {
    const dialogRef = this.dialog.open(DialogLogoutComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        localStorage.removeItem("user-login");
        this.mService.publishPageRoute("login");
      }
    });
  }

  onClickLanguage() {
    if (localStorage.getItem("language-key") == "VI") {
      this.language = "Tiếng Việt";
      localStorage.setItem("language-key", "EN");

      this.mService.LoadTitle("EN").then((data) => {
        localStorage.setItem("data-local", JSON.stringify(data));
      });
    } else {
      this.language = "English";
      localStorage.setItem("language-key", "VI");

      this.mService.LoadTitle("VI").then((data) => {
        localStorage.setItem("data-local", JSON.stringify(data));
      });
    }

    let currentUrl = this.router.url;
    this.router
      .navigateByUrl("/refresh", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });
  }

  onClickAddUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.mService
          .getApiService()
          .sendRequestADD_USER(res)
          .then((data) => {
            this.mService.showSnackBar(data.message);
          });
      }
    });
  }

  onClickListUser() {
    this.router.navigate(["list-user"]);
  }
}
