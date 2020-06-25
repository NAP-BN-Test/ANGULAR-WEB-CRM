import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-activity-comment',
  templateUrl: './activity-comment.component.html',
  styleUrls: ['./activity-comment.component.scss']
})
export class ActivityCommentComponent implements OnInit {

  @Output('onEditCmtChange') onEditCmtChange = new EventEmitter();
  @Output('onDeleteCmtChange') onDeleteCmtChange = new EventEmitter();
  @Input('mObj') mObj: any;

  mTitle: any;

  showQuillEditCmt = false;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mTitle = data.btn;
    });
  }

  onQuillCmtChange(event) {
    this.showQuillEditCmt = false;

    this.onEditCmtChange.emit(event);

  }

  onClickEditCmt() {
    this.showQuillEditCmt = true;
  }

  onClickDeleteCmt() {
    this.onDeleteCmtChange.emit();
  }

}
