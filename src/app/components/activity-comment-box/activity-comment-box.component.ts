import { Component, OnInit, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-activity-comment-box',
  templateUrl: './activity-comment-box.component.html',
  styleUrls: ['./activity-comment-box.component.scss']
})
export class ActivityCommentBoxComponent implements OnInit {

  @Input('mObj') mObj: any;

  showCmt = false;
  showQuillCmt = false;

  mTitle: any;

  cmtDetail = "keyboard_arrow_right";

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.company_detail;
    });
  }

  onQuillCommentChange(event) {
    this.showQuillCmt = false;

    if (event) {
      this.mService.getApiService().sendRequestADD_COMMENT(
        
        
        
        
        this.mService.getUser().name,
        this.mObj,
        event).then(data => {
          if (data.status == STATUS.SUCCESS) {
            this.mObj.listComment.push(data.obj);
          }
        })

    }
  }

  onDeleteCmtChange(item, index) {
    this.mService.getApiService().sendRequestDELETE_COMMENT(
      
      
      this.mObj,
      item.id,
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.mObj.listComment.splice(index, 1);
      }
    })
  }

  onEditCmtChange(event, item) {
    if (event) {
      item.content = event;

      this.mService.getApiService().sendRequestEDIT_COMMENT(
        
        
        
        
        this.mObj,
        item.id,
        item.content
      );
    }
  }

  onClickCmtDetail() {
    this.showCmt = !this.showCmt;
  }

  onClickCmt() {
    this.showQuillCmt = true;
  }

}
