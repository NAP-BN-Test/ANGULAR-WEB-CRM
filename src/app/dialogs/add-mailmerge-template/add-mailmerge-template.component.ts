import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-mailmerge-template',
  templateUrl: './add-mailmerge-template.component.html',
  styleUrls: ['./add-mailmerge-template.component.scss']
})
export class AddMailmergeTemplateComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddMailmergeTemplateComponent>
    ) { 
    this.myForm = this.formBuilder.group(
      {
        Name: [mData ? mData.Name : "", [Validators.required]],
      },
      { validator: [this.checkRequire] }
    );
  }

  ngOnInit(): void {
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.Name.value != "";
    if (requireName) return null;
    else return { require: true };
  }

  onClickOk(event){
    this.dialogRef.close({
      Name: this.myForm.value.Name,
      textContent: event.target.textContent.trim()
    });
  }

}
