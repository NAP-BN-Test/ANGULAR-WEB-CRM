import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { ACTIVITY_TYPE, STATUS } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-dropdown-associate',
  templateUrl: './dropdown-associate.component.html',
  styleUrls: ['./dropdown-associate.component.scss']
})
export class DropdownAssociateComponent implements OnInit {

  @Input('listUser') listUser = [];
  @Input('listAssociate') listAssociate = [];

  @Input('activityType') activityType = -1;
  @Input('activityID') activityID = -1;

  @Output('dropdownChange') dropdownChange = new EventEmitter();

  dropdownList = [];

  dropdown = true;

  associate = 0;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {
    setTimeout(() => {
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
        if (!document.getElementById('clickbox').contains(e.target)) {
          this.dropdown = true;
          let a = document.getElementById('m-box');
          a.classList.remove('m-box-focus');
        }

        this.associate = 0;
        this.dropdownList.forEach(item => {
          if (item.checked) {
            this.associate += 1;
          }
        })
      });
    }, 200);
  }

  onClickItem(index, item) {
    this.dropdownList[index].checked = !this.dropdownList[index].checked;

    if (this.activityType == ACTIVITY_TYPE.NOTE) {
      this.mService.getApiService().sendRequestUPDATE_NOTE_ASSOCIATE(
        this.mService.getServer().ip,
        this.mService.getServer().dbName,
        this.mService.getUser().username,
        item.id,
        this.activityID,
        item.checked ? 1 : 0
      ).then(data => {
        if (data.status == STATUS.SUCCESS) {
          this.dropdownChange.emit(data.message);
        }
      })
    }


  }


  onClickDropdown() {
    let a = document.getElementById('m-box');
    if (this.dropdown) {
      a.classList.add('m-box-focus');
    }
    else {
      a.classList.remove('m-box-focus');

      // this.selectDone.emit(this.dropdownList);
    }

    this.associate = 0;
    this.dropdownList.forEach(item => {
      if (item.checked) {
        this.associate += 1;
      }
    })
    this.dropdown = !this.dropdown;
  }

}
