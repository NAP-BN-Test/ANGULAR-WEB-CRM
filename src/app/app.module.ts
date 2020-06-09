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
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
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
import { ActivityCommentComponent } from './components/activity-comment/activity-comment.component';
import { ActivityCommentBoxComponent } from './components/activity-comment-box/activity-comment-box.component';
import { DropdownAttendCreateComponent } from './components/dropdown-attend-create/dropdown-attend-create.component';
import { CompanyRolePipe } from './pipes/company-role/company-role.pipe';
import { ContactRolePipe } from './pipes/contact-role/contact-role.pipe';
import { NaPipe } from './pipes/na/na.pipe';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactDetailIntroComponent } from './components/contact-detail-intro/contact-detail-intro.component';
import { ContactDetailActivityComponent } from './components/contact-detail-activity/contact-detail-activity.component';
import { ContactDetailOtherComponent } from './components/contact-detail-other/contact-detail-other.component';
import { ContactDetailActivityListComponent } from './components/contact-detail-activity-list/contact-detail-activity-list.component';
import { DialogAssignCompanyComponent } from './components/dialog-assign-company/dialog-assign-company.component';
import { DialogAssignContactComponent } from './components/dialog-assign-contact/dialog-assign-contact.component';
import { FollowPipe } from './pipes/follow/follow.pipe';
import { ActivityListTaskComponent } from './components/activity-list-task/activity-list-task.component';
import { TaskTypePipe } from './pipes/task-type/task-type.pipe';
import { ActivityListCallComponent } from './components/activity-list-call/activity-list-call.component';
import { ActivityListEmailComponent } from './components/activity-list-email/activity-list-email.component';
import { ActivityListMeetComponent } from './components/activity-list-meet/activity-list-meet.component';
import { ActivityListNoteComponent } from './components/activity-list-note/activity-list-note.component';
import { CallStatusPipe } from './pipes/call-status/call-status.pipe';
import { DialogLogoutComponent } from './components/dialog-logout/dialog-logout.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { CompanyTypePipe } from './pipes/company-type/company-type.pipe';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { DatetimeDefaultPipe } from './pipes/datetime-default/datetime-default.pipe';
import { MailStatusPipe } from './pipes/mail-status/mail-status.pipe';
import { ToHourPipe } from './pipes/to-hour/to-hour.pipe';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailListAddComponent } from './components/email-list-add/email-list-add.component';
import { EmailCampainComponent } from './components/email-campain/email-campain.component';
import { EmailCampainAddComponent } from './components/email-campain-add/email-campain-add.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';

import { ChartsModule } from 'ng2-charts';
import { ReportListAccountComponent } from './components/report-list-account/report-list-account.component';
import { EmailListSubComponent } from './components/email-list-sub/email-list-sub.component';
import { ListCompanyLogisticComponent } from './components/list-company-logistic/list-company-logistic.component';
import { ListCompanyTransportComponent } from './components/list-company-transport/list-company-transport.component';
import { DialogAddMailListComponent } from './components/dialog-add-mail-list/dialog-add-mail-list.component';
import { EmailCampainDetailComponent } from './components/email-campain-detail/email-campain-detail.component';
import { EmailListSubReportComponent } from './components/email-list-sub-report/email-list-sub-report.component';
import { DialogVerifyEmailComponent } from './components/dialog-verify-email/dialog-verify-email.component';

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
    DropdownAssociateCreateComponent,
    ActivityCommentComponent,
    ActivityCommentBoxComponent,
    DropdownAttendCreateComponent,
    CompanyRolePipe,
    ContactRolePipe,
    NaPipe,
    ContactDetailComponent,
    ContactDetailIntroComponent,
    ContactDetailActivityComponent,
    ContactDetailOtherComponent,
    ContactDetailActivityListComponent,
    DialogAssignCompanyComponent,
    DialogAssignContactComponent,
    FollowPipe,
    ActivityListTaskComponent,
    TaskTypePipe,
    ActivityListCallComponent,
    ActivityListEmailComponent,
    ActivityListMeetComponent,
    ActivityListNoteComponent,
    CallStatusPipe,
    DialogLogoutComponent,
    RefreshComponent,
    CompanyTypePipe,
    FilterBarComponent,
    DatetimeDefaultPipe,
    MailStatusPipe,
    ToHourPipe,
    AddUserComponent,
    EmailListComponent,
    EmailListAddComponent,
    EmailCampainComponent,
    EmailCampainAddComponent,
    ReportListComponent,
    ReportDetailComponent,
    ReportListAccountComponent,
    EmailListSubComponent,
    ListCompanyLogisticComponent,
    ListCompanyTransportComponent,
    DialogAddMailListComponent,
    EmailCampainDetailComponent,
    EmailListSubReportComponent,
    DialogVerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    QuillModule.forRoot(),
    NgbModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    DatetimeTimePipe,
    DatetimeFullPipe,
    DatetimeDatePipe
  ],
  entryComponents: [
    DialogComponent, 
    DialogAssignCompanyComponent,
    DialogAssignContactComponent,
    DialogLogoutComponent,
    DialogAddMailListComponent,
    DialogVerifyEmailComponent
  ]
})
export class AppModule { }
