import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpModule } from '@angular/http';
import { MainComponent } from './components/main/main.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyDetailComponent } from './components/company-detail/company-detail.component';
import { CompanySubDetailComponent } from './components/company-sub-detail/company-sub-detail.component';
import { CompanyDetailActivityComponent } from './components/company-detail-activity/company-detail-activity.component';
import { CompanySubDetailContactComponent } from './components/company-sub-detail-contact/company-sub-detail-contact.component';
import { CompanySubDetailCompanyComponent } from './components/company-sub-detail-company/company-sub-detail-company.component';
import { CompanySubDetailDealComponent } from './components/company-sub-detail-deal/company-sub-detail-deal.component';
import { CreateEmailComponent } from './components/create-email/create-email.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { CreateCallComponent } from './components/create-call/create-call.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CreateMeetComponent } from './components/create-meet/create-meet.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddDealComponent } from './components/add-deal/add-deal.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    HeaderMenuComponent,
    CompanyInfoComponent,
    CompanyDetailComponent,
    CompanySubDetailComponent,
    CompanyDetailActivityComponent,
    CompanySubDetailContactComponent,
    CompanySubDetailCompanyComponent,
    CompanySubDetailDealComponent,
    CreateEmailComponent,
    CreateNoteComponent,
    CreateCallComponent,
    CreateTaskComponent,
    CreateMeetComponent,
    AddContactComponent,
    AddCompanyComponent,
    AddDealComponent,
    DashboardComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
