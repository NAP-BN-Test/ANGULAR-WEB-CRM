import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, ACTIVITY_TYPE } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  @Output("closeCreateAction") closeCreateAction = new EventEmitter();

  @Input("createInContact") createInContact = false;

  mData: any;

  showTimePicker = false;

  listAssociate = [];

  mConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  }

  quillValue: any;
  dateFollow: string;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.create_tag;
    });
  }

  onClickClose() {
    this.closeCreateAction.emit();

    this.quillValue = "";
  }

  onInputChange(event) {
    this.showTimePicker = event.target.checked;
  }

  onClickSave() {
    this.mService.getApiService().sendRequestCREATE_NOTE(
      this.mService.getUser().username,
      this.mService.getUser().id,
      !this.createInContact ? this.cookieService.get('company-id') : null,
      this.createInContact ? this.cookieService.get('contact-id') : null,
      this.quillValue,
      this.listAssociate,
      this.dateFollow).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeCreateAction.emit(data.obj);

          this.quillValue = "";
        }
      })
  }

  onPickDate(event) {
    this.dateFollow = event;
  }

  onAssociateChange(event) {
    if (event)
      this.listAssociate = event;
  }

}
