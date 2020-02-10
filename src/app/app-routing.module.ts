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
