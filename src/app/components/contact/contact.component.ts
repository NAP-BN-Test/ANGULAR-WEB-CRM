import { Component, OnInit } from '@angular/core';
import { AppModuleService } from 'src/app/services/app-module.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  mData: any;

  menuSelected = 1;

  checked = false;
  indeterminate = false;
  disabled = false;

  numberOfItemSelected = 0;

  data = [
    {
      id: 1,
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754,
      checked: false
    },
    {
      id: 2,
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      area: 640679,
      population: 64979548,
      checked: false
    },
    {
      id: 3,
      name: 'Germany',
      flag: 'b/ba/Flag_of_Germany.svg',
      area: 357114,
      population: 82114224,
      checked: false
    },
    {
      id: 4,
      name: 'Portugal',
      flag: '5/5c/Flag_of_Portugal.svg',
      area: 92090,
      population: 10329506,
      checked: false
    },
    {
      id: 5,
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199,
      checked: false
    },
    {
      id: 6,
      name: 'Vietnam',
      flag: '2/21/Flag_of_Vietnam.svg',
      area: 331212,
      population: 95540800,
      checked: false
    },
    {
      id: 7,
      name: 'Brazil',
      flag: '0/05/Flag_of_Brazil.svg',
      area: 8515767,
      population: 209288278,
      checked: false
    },
    {
      id: 8,
      name: 'Mexico',
      flag: 'f/fc/Flag_of_Mexico.svg',
      area: 1964375,
      population: 129163276,
      checked: false
    },
    {
      id: 9,
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463,
      checked: false
    },
    {
      id: 10,
      name: 'India',
      flag: '4/41/Flag_of_India.svg',
      area: 3287263,
      population: 1324171354,
      checked: false
    },
    {
      id: 11,
      name: 'Indonesia',
      flag: '9/9f/Flag_of_Indonesia.svg',
      area: 1910931,
      population: 263991379,
      checked: false
    },
    {
      id: 12,
      name: 'Tuvalu',
      flag: '3/38/Flag_of_Tuvalu.svg',
      area: 26,
      population: 11097,
      checked: false
    },
    {
      id: 13,
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397,
      checked: false
    }
  ]
  constructor(
    public mService: AppModuleService,
  ) { }

  ngOnInit() {
    this.mService.LoadTitle(1).then((data: any) => {
      this.mData = data.contact;
    })
  }

  page = 1;
  pageSize = 4;
  collectionSize = this.data.length;

  get countries(): Array<any> {
    return this.data
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  pow = 0;
  onSort() {
    this.pow += 1;

    this.data = this.data.sort((a, b) => {
      if (a.name > b.name) return Math.pow(-1, this.pow);
      if (a.name < b.name) return Math.pow(-1, this.pow + 1);
      return 0;
    })
  }

  onClickMenu(index: number) {
    this.menuSelected = index;
  }

  onCheckBoxChange(item) {
    let index = this.data.findIndex(it => {
      return it.id == item.id;
    });

    if (index > -1) {
      this.data[index].checked = !this.data[index].checked;
    }

    let value = this.data[index].checked ? 2 : 0;

    this.numberOfItemSelected = 0;

    this.countries.forEach(it => {
      if (it.checked) this.numberOfItemSelected += 1;

      if (!it.checked && value == 0) value = 0;
      else if (!it.checked && value == 2) value = 1;
      else if (it.checked && value == 0) value = 1;
      else if (it.checked && value == 2) value = 2;
      else value = 1;
    });

    if (value == 0) {
      this.checked = false;
      this.indeterminate = false
    }
    else if (value == 1) {
      this.indeterminate = true;
    }
    else if (value == 2) {
      this.checked = true;
      this.indeterminate = false;
    }

  }

  onCheckAllChange() {
    this.numberOfItemSelected = 0;

    if (this.checked) {
      this.data.forEach(item => {
        item.checked = false;
      })
    }
    else {
      this.countries.forEach(it => {
        let obj = this.data.find(it1 => {
          return it1.id == it.id;
        });
        obj.checked = true;
        this.numberOfItemSelected += 1;
      })
    }
  }

  onClickPagination() {
    this.checked = false;
    this.data.forEach(item => {
      item.checked = false;
    })
  }

}
