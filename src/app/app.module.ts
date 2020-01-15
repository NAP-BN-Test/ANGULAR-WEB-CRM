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
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'ngx-cookie-service'

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
import { DatetimePickDateComponent } from './components/datetime-pick-date/datetime-pick-date.component';
import { DatetimePickTimeComponent } from './components/datetime-pick-time/datetime-pick-time.component';
import { DatetimePickDateFullComponent } from './components/datetime-pick-date-full/datetime-pick-date-full.component';
import { DatetimeTimePipe } from './pipes/datetime-time/datetime-time.pipe';
import { DatetimeFullPipe } from './pipes/datetime-full/datetime-full.pipe';
import { DatetimeDatePipe } from './pipes/datetime-date/datetime-date.pipe';
import { DatetimeTimeDefaultPipe } from './pipes/datetime-time-default/datetime-time-default.pipe';
import { ContactMenuCompanyComponent } from './components/contact-menu-company/contact-menu-company.component';
import { ContactMenuContactComponent } from './components/contact-menu-contact/contact-menu-contact.component';
import { ToastComponent } from './components/toast/toast.component';
import { DropdownMultiComponent } from './components/dropdown-multi/dropdown-multi.component';
import { QuillBoxComponent } from './components/quill-box/quill-box.component';
import { DropdownAssociateComponent } from './components/dropdown-associate/dropdown-associate.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DropdownAssociateCreateComponent } from './components/dropdown-associate-create/dropdown-associate-create.component';

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
    DatetimePickDateComponent,
    DatetimePickTimeComponent,
    DatetimePickDateFullComponent,
    DatetimeTimePipe,
    DatetimeFullPipe,
    DatetimeDatePipe,
    DatetimeTimeDefaultPipe,
    ContactMenuCompanyComponent,
    ContactMenuContactComponent,
    ToastComponent,
    DropdownMultiComponent,
    QuillBoxComponent,
    DropdownAssociateComponent,
    DialogComponent,
    DropdownAssociateCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgbModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    DatetimeTimePipe,
    DatetimeFullPipe,
    DatetimeDatePipe
  ],
  entryComponents: [DialogComponent]
})
export class AppModule { }
