import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactMenuContactComponent } from './components/contact-menu-contact/contact-menu-contact.component';
import { ContactMenuCompanyComponent } from './components/contact-menu-company/contact-menu-company.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ActivityListTaskComponent } from './components/activity-list-task/activity-list-task.component';


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
