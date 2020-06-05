import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { LIST_SELECT, STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

import * as moment from 'moment';

@Component({
  selector: 'app-email-campain-add',
  templateUrl: './email-campain-add.component.html',
  styleUrls: ['./email-campain-add.component.scss']
})
export class EmailCampainAddComponent implements OnInit {
  @ViewChild('editor') editor;
  @ViewChild('quillFile') quillFileRef: ElementRef;

  @Output("closeAddSub") closeAddSub = new EventEmitter();

  @Input("addOut") addOut: number;

  sendByTime = false;

  mData: any;

  name = "";
  subject = "";
  mailListID = -1;
  endTime: any;
  btnType = 1;

  quillContent = "";

  listContact = [];

  btnAddExist = true;
  btnCanClicked = true;

  listGender = LIST_SELECT.LIST_GENDER;
  listMailList = [];

  quillFile: any;
  meQuillRef: any;

  editorModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        // ['link', 'image', 'video']                         // link and image, video
      ],
      handlers: {
        image: () => {
          this.quillFileRef.nativeElement.click();
        }
      }
    },
  };

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(localStorage.getItem('language-key') != null ? localStorage.getItem('language-key') : "VI").then((data: any) => {
      this.mData = data.add_sub_detail;
    });

    this.mService.getApiService().sendRequestGET_MAIL_LIST_OPTION().then(data => {
      if (data.status == STATUS.SUCCESS)
        this.listMailList = data.array;
    })
  }

  onClickClose() {
    this.closeAddSub.emit();

    this.name = "";
    this.mailListID = -1;
    this.subject = "";
    this.quillContent = "";
  }

  onClickAddExist() {
    this.btnAddExist = true;
  }

  onClickAddNew() {
    this.btnAddExist = false;
  }

  onClickSave() {

    if (this.name.trim() != "" && this.subject.trim() != "" && this.quillContent.trim() != "" && this.mailListID != -1) {
      let obj = {
        name: this.name,
        mailListID: this.mailListID,
        subject: this.subject,
        body: this.quillContent,
        createTime: moment().format("YYYY-MM-DD"),
        endTime: moment(this.endTime.year + "-" + this.endTime.month + "-" + this.endTime.day).format("YYYY-MM-DD"),
        nearestSend: moment().format("YYYY-MM-DD"),
        owner: this.mService.getUser().name
      }

      this.mService.getApiService().sendRequestADD_MAIL_CAMPAIN(
        this.mService.getUser().id,
        obj
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.closeAddSub.emit(obj);

          this.name = "";
          this.mailListID = -1;
          this.subject = "";
          this.quillContent = "";
        }
      })
    }
  }

  onSeachContact(event) {
    let searchKey = event.target.value;

    this.mService.getApiService().sendRequestSEARCH_CONTACT(
      this.mService.getUser().username,
      this.mService.getUser().id,
      searchKey
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listContact = data.array;
      }
    })
  }

  onClickAddContact(item) {
    this.mService.getApiService().sendRequestADD_CONTACT_BY_ID(
      this.mService.getUser().username,
      this.mService.getUser().id,
      this.cookieService.get('company-id') ? this.cookieService.get('company-id') : null,
      item.id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.closeAddSub.emit(data.obj);
      }
    })
  }

  onRadioChange(event) {
    if (event.value == 2) {
      this.sendByTime = true;
    } else {
      this.sendByTime = false;
    }
  }

  onClickStep(index) {
    this.btnType = index;
  }




  quillFileSelected(ev: any) {

    let file = ev.target.files[0];
    if (file.type.startsWith("image")) {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      
      reader.addEventListener("load", (image) => {
        console.log(image);
        
        let avatar: any = image.target["result"];


        this.mService.getApiService().sendRequestUPLOAD_FILE(btoa(avatar)).then(data => {
          if (data.status == STATUS.SUCCESS) {
            console.log(data.url);

            this.quillContent = this.quillContent + data.url;

          }
        })
      })
    }

    // const imageData = {
    //   id: this.article != null && this.article !== undefined ? this.article.post_id : null,
    //   title: this.quillFile.name,
    //   file: this.quillFile
    // };
    // this.dataService.postImage(imageData).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     const filename = response.data.filename;
    //   }
    // );

  }

}
