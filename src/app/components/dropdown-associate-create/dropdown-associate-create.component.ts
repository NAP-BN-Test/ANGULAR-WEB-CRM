import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';
import { STATUS } from 'src/app/services/constant/app-constant';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dropdown-associate-create',
  templateUrl: './dropdown-associate-create.component.html',
  styleUrls: ['./dropdown-associate-create.component.scss']
})
export class DropdownAssociateCreateComponent implements OnInit {

  @Input('mID') mID = [];
  @Input('activityType') type = [];
  @Input('listContact') listContact = [];

  listUser = [];
  listAssociate = [];


  @Output('dropdownChange') dropdownChange = new EventEmitter();

  dropdownList = [];

  dropdown = true;

  associate = 0;

  constructor(
    public mService: AppModuleService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    if (this.cookieService.get('list-contact')) {
      let list = this.cookieService.get('list-contact');
      this.listContact = JSON.parse(list);
    }


    this.listContact.forEach(item => {
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
      if (document.getElementById('drop-clickbox' + this.type)) {
        if (!document.getElementById('drop-clickbox' + this.type).contains(e.target)) {
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
      }
    });

  }

  onClickItem(index) {
    this.dropdownList[index].checked = !this.dropdownList[index].checked;
  }


  onClickDropdown() {
    let a = document.getElementById('m-drop-box');
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
