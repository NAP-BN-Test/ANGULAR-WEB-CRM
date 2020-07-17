import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS, ACTIVITY_TYPE } from 'src/app/services/constant/app-constant';

@Component({
  selector: 'app-dropdown-multi',
  templateUrl: './dropdown-multi.component.html',
  styleUrls: ['./dropdown-multi.component.scss']
})
export class DropdownMultiComponent implements OnInit {

  @Input('listUser') listUser = [];
  @Input('listAttend') listAttend = [];

  @Input('activityType') activityType: any;
  @Input('activityID') activityID: any;

  @Output('dropdownChange') dropdownChange = new EventEmitter();

  dropdownList = [];

  dropdown = true;

  attend = 0;

  constructor(
    public mService: AppModuleService
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.listUser.forEach(item => {
        let index = this.listAttend.findIndex(idx => {
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

      this.attend = 0;
      this.dropdownList.forEach(item => {
        if (item.checked) {
          this.attend += 1;
        }
      })

      window.addEventListener('click', (e: any) => {
        if (document.getElementById('clickbox1' + this.activityType + "" + this.activityID)) {
          if (!document.getElementById('clickbox1' + this.activityType + "" + this.activityID).contains(e.target)) {
            this.dropdown = true;
            let a = document.getElementById('m-box1');
            a.classList.remove('m-box-focus');
          }

          this.attend = 0;
          this.dropdownList.forEach(item => {
            if (item.checked) {
              this.attend += 1;
            }
          })
        }

      });
    }, 200);
  }

  onClickItem(index, item) {
    this.dropdownList[index].checked = !this.dropdownList[index].checked

    // if (this.activityType == ACTIVITY_TYPE.MEET) {
    //   this.mService.getApiService().sendRequestUPDATE_MEET_ATTEND(
    //     this.activityID,
    //     item.checked ? 1 : 0
    //   ).then(data => {
    //     if (data.status == STATUS.SUCCESS) {
    //       this.dropdownChange.emit(data.message);
    //     }
    //   })
    // }
  }

  onClickDropdown() {
    let a = document.getElementById('m-box1');
    if (this.dropdown) {
      a.classList.add('m-box-focus');
    }
    else {
      a.classList.remove('m-box-focus');
    }

    this.attend = 0;
    this.dropdownList.forEach(item => {
      if (item.checked) {
        this.attend += 1;
      }
    })
    this.dropdown = !this.dropdown;
  }


}
