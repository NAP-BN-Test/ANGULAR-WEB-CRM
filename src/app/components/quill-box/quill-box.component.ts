import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-quill-box',
  templateUrl: './quill-box.component.html',
  styleUrls: ['./quill-box.component.scss']
})
export class QuillBoxComponent implements OnInit {
  @Input('quillValue') quillValue = "";

  @Output("onClickEdit") onClickEdit = new EventEmitter();

  mData: any;

  mConfig = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['code-block']
    ]
  }
  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.btn;
    })
  }

  onClickSave() {
    this.onClickEdit.emit(this.quillValue);
  }

  onClickClose() {
    this.onClickEdit.emit()
  }

}
