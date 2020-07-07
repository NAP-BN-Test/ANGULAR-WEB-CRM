import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AppModuleService } from 'src/app/services/app-module.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-category-city',
  templateUrl: './add-category-city.component.html',
  styleUrls: ['./add-category-city.component.scss']
})
export class AddCategoryCityComponent implements OnInit {

  myForm: FormGroup;

  listCountry = [];
  filterListCountry: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    public mService: AppModuleService,
    @Inject(MAT_DIALOG_DATA) public mData: any,
    public dialogRef: MatDialogRef<AddCategoryCityComponent>
  ) {
    this.myForm = this.formBuilder.group({
      name: [mData ? mData.name : '', [Validators.required]],
      code: [mData ? mData.code : '', [Validators.required]],
      country: [mData ? mData.country : '', [Validators.required]]
    }, { validator: [this.checkRequire] });
  }

  ngOnInit(): void {
    this.mService.getApiService().sendRequestGET_ALL_CATEGORY_COUNTRY().then(data => {
      this.listCountry = data.array;
      this.filterListCountry = this.myForm.controls.country.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.listCountry.filter((option: any) => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  checkRequire(group: FormGroup) {
    let requireName = group.controls.name.value != "";
    let requireCode = group.controls.code.value != "";
    let requireCountry = group.controls.country.value != "";

    if (requireName && requireCode && requireCountry)
      return null;
    else return { require: true };
  }

  onClickOk() {
    let obj = this.listCountry.find(item => {
      return item.name.toLowerCase() == this.myForm.value.country.toLowerCase()
    })

    this.dialogRef.close({
      name: this.myForm.value.name,
      code: this.myForm.value.code,
      countryID: obj.id,
    })
  }

}
