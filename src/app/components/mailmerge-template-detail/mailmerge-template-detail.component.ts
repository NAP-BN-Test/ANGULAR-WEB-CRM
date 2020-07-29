import { Component, OnInit } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { LOCAL_STORAGE_KEY } from "src/app/services/constant/app-constant";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-mailmerge-template-detail",
  templateUrl: "./mailmerge-template-detail.component.html",
  styleUrls: ["./mailmerge-template-detail.component.scss"],
})
export class MailmergeTemplateDetailComponent implements OnInit {

  closeResult = "";
  mTitle: any;
  levels: Array<Object> = [
    { num: 0, name: "Text" },
    { num: 1, name: "Picture" },
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    let languageData = localStorage.getItem(LOCAL_STORAGE_KEY.LANGUAGE_DATA);
    this.mTitle = JSON.parse(languageData);
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "600px",
    minHeight: "0",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: "http://163.44.192.123:3302/crm/upload_file",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [],
  };

  openNew(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "add-new-campaign" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
