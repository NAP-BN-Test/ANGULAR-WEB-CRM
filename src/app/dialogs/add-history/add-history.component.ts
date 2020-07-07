import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.scss']
})
export class AddHistoryComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";

    if (requireName)
      return null;
    else return { require: true };
  }

}
