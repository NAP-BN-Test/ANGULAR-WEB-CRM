import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-dropdown-attend-create',
  templateUrl: './dropdown-attend-create.component.html',
  styleUrls: ['./dropdown-attend-create.component.scss']
})
export class DropdownAttendCreateComponent implements OnInit {
  @Input('mID') mID = [];

  listUser = [];
  listAssociate = [];


  @Output('dropdownChange') dropdownChange = new EventEmitter();

  dropdownList = [];

  dropdown = true;

  associate = 0;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {

    this.mService.getApiService().sendRequestGET_LIST_USER(
      this.mService.getServer().ip,
      this.mService.getServer().dbName,
      this.mService.getUser().username,
      this.mService.getUser().id
    ).then(data => {
      if (data.status == STATUS.SUCCESS) {
        this.listUser = data.array;

        this.listUser.forEach(item => {
          let index = this.listAssociate.findIndex(idx => {
            return idx == item.id;
          });

          let checked = false;
          if (index > -1) {
            checked = true;
          }

          let it = {
            id: item.id,
            name: item.name,
            checked: checked
          }
          this.dropdownList.push(it);
        })

        this.associate = 0;
        this.dropdownList.forEach(item => {
          if (item.checked) {
            this.associate += 1;
          }
        })

        window.addEventListener('click', (e: any) => {
          if (!document.getElementById('drop-meet-box').contains(e.target)) {
            this.dropdown = true;
            let a = document.getElementById('m-drop-box');
            a.classList.remove('m-box-focus');

            this.onEmit();
          }

          this.associate = 0;
          this.dropdownList.forEach(item => {
            if (item.checked) {
              this.associate += 1;
            }
          })
        });
      }
    });

  }

  onClickItem(index) {
    this.dropdownList[index].checked = !this.dropdownList[index].checked;
  }


  onClickDropdown() {
    let a = document.getElementById('drop-meet');
    if (this.dropdown) {
      a.classList.add('m-box-focus');
    }
    else {
      a.classList.remove('m-box-focus');

      this.onEmit();
    }

    this.associate = 0;
    this.dropdownList.forEach(item => {
      if (item.checked) {
        this.associate += 1;
      }
    })
    this.dropdown = !this.dropdown;
  }

  onEmit() {
    let list = [];
    this.dropdownList.forEach(item => {
      if (item.checked) {
        list.push(item.id);
      }
    });

    this.dropdownChange.emit(list)
  }

}
