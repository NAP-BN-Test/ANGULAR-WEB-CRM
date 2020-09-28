import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export interface ConditionFields {
  name: string;
}

export interface Fields {
  name: string;
}

@Component({
  selector: "app-search-board",
  templateUrl: "./search-board.component.html",
  styleUrls: ["./search-board.component.scss"],
})
export class SearchBoardComponent implements OnInit {
  @Input("listFields") listFields = [];
  @Input("noAdd") noAdd = false;
  @Input("noOption") noOption = false;
  @Input("title") title = "";

  @Output("search") search = new EventEmitter();
  @Output("clickAdd") clickAdd = new EventEmitter();
  @Output("clickOption") clickOption = new EventEmitter();

  listConditions: ConditionFields[] = [
    { name: "And" },
    { name: "Or" },
    { name: "Not" },
  ];

  searchNormal = true;
  myForm: FormGroup;
  hasSearch = false;

  filteredConditions: Observable<ConditionFields[]>[] = [];
  filteredFields: Observable<Fields[]>[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.myForm = this.fb.group({
      search: [""],
      items: this.initItems(),
    });
    this.ManageNameControl(0);
  }

  initItems() {
    var formArray = this.fb.array([]);

    formArray.push(
      this.fb.group({
        conditionFields: [""],
        fields: [""],
        searchFields: [""],
      })
    );
    return formArray;
  }

  ManageNameControl(index: number) {
    var arrayControl = this.myForm.get("items") as FormArray;
    this.filteredConditions[index] = arrayControl
      .at(index)
      .get("conditionFields")
      .valueChanges.pipe(
        startWith<string | ConditionFields>(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterConditions(name) : this.listConditions.slice()
        )
      );
    this.filteredFields[index] = arrayControl
      .at(index)
      .get("fields")
      .valueChanges.pipe(
        startWith<string | Fields>(""),
        map((value) => (typeof value === "string" ? value : value.name)),
        map((name) =>
          name ? this._filterFields(name) : this.listFields.slice()
        )
      );
  }

  addNewItem() {
    const controls = <FormArray>this.myForm.controls["items"];
    let formGroup = this.fb.group({
      conditionFields: [""],
      fields: [""],
      searchFields: [""],
    });
    controls.push(formGroup);
    // Build the account Auto Complete values
    this.ManageNameControl(controls.length - 1);
  }
  removeItem(i: number) {
    const controls = <FormArray>this.myForm.controls["items"];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredConditions.splice(i, 1);
    this.filteredFields.splice(i, 1);
  }

  private _filterConditions(value: string): ConditionFields[] {
    const filterValue = value.toLowerCase();
    return this.listConditions.filter((option: any) =>
      option.name.toLowerCase().indexOf(filterValue)
    );
  }

  private _filterFields(value: string): Fields[] {
    const filterValue = value.toLowerCase();

    return this.listFields.filter((option: any) =>
      option.name.toLowerCase().indexOf(filterValue)
    );
  }

  displayFnConditions(ConditionFields?: ConditionFields): string | undefined {
    return ConditionFields ? ConditionFields.name : undefined;
  }

  displayFnFields(Fields?: Fields): string | undefined {
    return Fields ? Fields.name : undefined;
  }

  onClickClear() {
    this.myForm.reset();
  }

  onSubmit(value) {
    this.search.emit(value);
  }

  onClickSearch() {
    this.hasSearch = !this.hasSearch;
  }

  onClickOption(event) {
    this.clickOption.emit();
  }

  onClickAddNew() {
    this.clickAdd.emit();
  }
}
