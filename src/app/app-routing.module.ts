import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactMenuContactComponent } from './components/contact-menu-contact/contact-menu-contact.component';
import { ContactMenuCompanyComponent } from './components/contact-menu-company/contact-menu-company.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ActivityListTaskComponent } from './components/activity-list-task/activity-list-task.component';
import { ActivityListCallComponent } from './components/activity-list-call/activity-list-call.component';
import { ActivityListEmailComponent } from './components/activity-list-email/activity-list-email.component';
import { ActivityListMeetComponent } from './components/activity-list-meet/activity-list-meet.component';
import { ActivityListNoteComponent } from './components/activity-list-note/activity-list-note.component';
import { RefreshComponent } from './components/refresh/refresh.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailCampainComponent } from './components/email-campain/email-campain.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailComponent } from './components/report-detail/report-detail.component';
import { ReportListAccountComponent } from './components/report-list-account/report-list-account.component';
import { EmailListSubComponent } from './components/email-list-sub/email-list-sub.component';
import { ListCompanyLogisticComponent } from './components/list-company-logistic/list-company-logistic.component';
import { ListCompanyTransportComponent } from './components/list-company-transport/list-company-transport.component';
import { EmailCampainDetailComponent } from './components/email-campain-detail/email-campain-detail.component';
import { EmailListSubReportComponent } from './components/email-list-sub-report/email-list-sub-report.component';


const routes: Routes = [
  {
    path: 'company-detail',
    component: HomeComponent,
    data: { title: 'Company Detail' }
  },
  {
    path: 'contact-detail',
    component: ContactDetailComponent,
    data: { title: 'Contact Detail' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'contact-menu-contact',
    component: ContactMenuContactComponent,
    data: { title: 'Contact' }
  },
  {
    path: 'contact-menu-company',
    component: ContactMenuCompanyComponent,
    data: { title: 'Company' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: 'task',
    component: ActivityListTaskComponent,
    data: { title: 'task' }
  },
  {
    path: 'call',
    component: ActivityListCallComponent,
    data: { title: 'call' }
  },
  {
    path: 'email',
    component: ActivityListEmailComponent,
    data: { title: 'email' }
  },
  {
    path: 'meet',
    component: ActivityListMeetComponent,
    data: { title: 'meet' }
  },
  {
    path: 'note',
    component: ActivityListNoteComponent,
    data: { title: 'note' }
  },
  {
    path: 'refresh',
    component: RefreshComponent,
    data: { title: 'refresh' }
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    data: { title: 'addUser' }
  },
  {
    path: 'email-list',
    component: EmailListComponent,
    data: { title: 'emailList' }
  },
  {
    path: 'email-list-sub',
    component: EmailListSubComponent,
    data: { title: 'emailListSub' }
  },
  {
    path: 'email-campain',
    component: EmailCampainComponent,
    data: { title: 'emailCampain' }
  },
  {
    path: 'report-list',
    component: ReportListComponent,
    data: { title: 'reportList' }
  },
  {
    path: 'report-detail',
    component: ReportDetailComponent,
    data: { title: 'reportDetail' }
  },
  {
    path: 'report-list-account',
    component: ReportListAccountComponent,
    data: { title: 'reportListAccount' }
  },
  {
    path: 'logistic_company',
    component: ListCompanyLogisticComponent,
    data: { title: 'listCompanyLogistic' }
  },
  {
    path: 'trasport_company',
    component: ListCompanyTransportComponent,
    data: { title: 'listCompanyTransport' }
  },
  {
    path: 'email-campain-detail',
    component: EmailCampainDetailComponent,
    data: { title: 'mailCampainDetail' }
  },
  {
    path: 'email-list-sub-report',
    component: EmailListSubReportComponent,
    data: { title: 'mailListSubReport' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
