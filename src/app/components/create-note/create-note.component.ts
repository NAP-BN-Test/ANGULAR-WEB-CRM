import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, ACTIVITY_TYPE } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  @Input('mID') mID = -1;
  @Output("closeCreateAction") closeCreateAction = new EventEmitter();

  mData: any;

  showTimePicker = false;

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
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.create_tag;
    })
  }

  onClickClose() {
    this.closeCreateAction.emit()
  }

  onInputChange(event) {
    this.showTimePicker = event.target.checked;
  }

  onClickSave() {
    this.mService.getApiService().sendRequestCREATE_NOTE(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.mID,
      this.quillValue,
      this.dateFollow).then(data => {
        if (data.status == STATUS.SUCCESS)
          this.closeCreateAction.emit(data.obj)
      })
  }

  onPickDate(event) {
    this.dateFollow = event;
  }

}
