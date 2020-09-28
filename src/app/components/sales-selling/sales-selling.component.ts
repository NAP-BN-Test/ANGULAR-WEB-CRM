import { Component, OnInit } from "@angular/core";
import { AppModuleService } from "src/app/services/app-module.service";

@Component({
  selector: "app-sales-selling",
  templateUrl: "./sales-selling.component.html",
  styleUrls: ["./sales-selling.component.scss"],
})
export class SalesSellingComponent implements OnInit {
  constructor(public mService: AppModuleService) {}

  ngOnInit(): void {
    this.mService.LoadAppConfig();
    if (this.mService.getUser()) {
      let params: any = this.mService.handleActivatedRoute();
      //==================================================================
    } else {
      this.mService.publishPageRoute("login");
    }
  }
}
