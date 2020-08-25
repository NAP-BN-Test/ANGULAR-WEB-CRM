import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { MatDialogRef } from '@angular/material';

@Component({
  selector: "app-option-column-selected-address-book",
  templateUrl: "./option-column-selected-address-book.component.html",
  styleUrls: ["./option-column-selected-address-book.component.scss"],
})
export class OptionColumnSelectedAddressBookComponent {
  Visible = [
    { name: "Full Name", cell: "name" },
    { name: "Address", cell: "address" },
    { name: "City", cell: "city" },
    { name: "Country", cell: "Country" },
    { name: "Email", cell: "email" },
    { name: "Phone", cell: "phone" },
    { name: "Fax", cell: "Fax" },
    { name: "Role", cell: "Role" },
  ];

  Invisible = [];

  constructor(
    public dialogRef: MatDialogRef<OptionColumnSelectedAddressBookComponent>,
  ){}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onClick() {
    this.dialogRef.close({
      listColum: this.Visible
    });
  }
}
