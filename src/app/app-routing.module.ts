import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ContactMenuContactComponent } from "./components/contact-menu-contact/contact-menu-contact.component";
import { ContactMenuCompanyComponent } from "./components/contact-menu-company/contact-menu-company.component";
import { ContactDetailComponent } from "./components/contact-detail/contact-detail.component";
import { ActivityListTaskComponent } from "./components/activity-list-task/activity-list-task.component";
import { ActivityListCallComponent } from "./components/activity-list-call/activity-list-call.component";
import { ActivityListEmailComponent } from "./components/activity-list-email/activity-list-email.component";
import { ActivityListMeetComponent } from "./components/activity-list-meet/activity-list-meet.component";
import { ActivityListNoteComponent } from "./components/activity-list-note/activity-list-note.component";
import { RefreshComponent } from "./components/refresh/refresh.component";
import { EmailListComponent } from "./components/email-list/email-list.component";
import { EmailCampainComponent } from "./components/email-campain/email-campain.component";
import { ReportListComponent } from "./components/report-list/report-list.component";
import { ReportDetailComponent } from "./components/report-detail/report-detail.component";
import { ReportListAccountComponent } from "./components/report-list-account/report-list-account.component";
import { EmailListSubComponent } from "./components/email-list-sub/email-list-sub.component";
import { ListCompanyLogisticComponent } from "./components/list-company-logistic/list-company-logistic.component";
import { ListCompanyTransportComponent } from "./components/list-company-transport/list-company-transport.component";
import { EmailCampainDetailComponent } from "./components/email-campain-detail/email-campain-detail.component";
import { EmailListSubReportComponent } from "./components/email-list-sub-report/email-list-sub-report.component";
import { ReportListMaillistComponent } from "./components/report-list-maillist/report-list-maillist.component";
import { ReportListMaillistDetailComponent } from "./components/report-list-maillist-detail/report-list-maillist-detail.component";
import { CategoryCityComponent } from "./components/category-city/category-city.component";
import { CategoryStepComponent } from "./components/category-step/category-step.component";
import { CategoryCountryComponent } from "./components/category-country/category-country.component";
import { ListHistoryComponent } from "./components/list-history/list-history.component";
import { CategoryJobTileComponent } from "./components/category-job-tile/category-job-tile.component";
import { CategoryCallOutcomeComponent } from "./components/category-call-outcome/category-call-outcome.component";
import { CategoryMailOutcomeComponent } from "./components/category-mail-outcome/category-mail-outcome.component";
import { CategoryUserComponent } from "./components/category-user/category-user.component";
import { MailmergeTemplateListComponent } from "./components/mailmerge-template-list/mailmerge-template-list.component";
import { MailmergeCampaignListComponent } from "./components/mailmerge-campaign-list/mailmerge-campaign-list.component";
import { SetupFollowMailmergeCampaignComponent } from "./components/setup-follow-mailmerge-campaign/setup-follow-mailmerge-campaign.component";
import { MailmergeTemplateDetailComponent } from "./components/mailmerge-template-detail/mailmerge-template-detail.component";
import { AddItemsToMailmergeCampaignComponent } from "./dialogs/add-items-to-mailmerge-campaign/add-items-to-mailmerge-campaign.component";
import { AddMailmergeTemplateComponent } from './dialogs/add-mailmerge-template/add-mailmerge-template.component';
import { AddressBookComponent } from './components/address-book/address-book.component';
import { AddressBookDetailComponent } from './components/address-book-detail/address-book-detail.component';

//GiHug: Thêm đường dẫn route
const routes: Routes = [
  {
    path: "company-detail",
    component: HomeComponent,
    data: { title: "Company Detail" },
  },
  {
    path: "contact-detail",
    component: ContactDetailComponent,
    data: { title: "Contact Detail" },
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title: "Dashboard" },
  },
  {
    path: "contacts",
    component: ContactMenuContactComponent,
    data: { title: "Contact" },
  },
  {
    path: "companies",
    component: ContactMenuCompanyComponent,
    data: { title: "Company" },
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "login" },
  },
  {
    path: "task",
    component: ActivityListTaskComponent,
    data: { title: "task" },
  },
  {
    path: "call",
    component: ActivityListCallComponent,
    data: { title: "call" },
  },
  {
    path: "email",
    component: ActivityListEmailComponent,
    data: { title: "email" },
  },
  {
    path: "meet",
    component: ActivityListMeetComponent,
    data: { title: "meet" },
  },
  {
    path: "note",
    component: ActivityListNoteComponent,
    data: { title: "note" },
  },
  {
    path: "refresh",
    component: RefreshComponent,
    data: { title: "refresh" },
  },
  {
    path: "email-list",
    component: EmailListComponent,
    data: { title: "emailList" },
  },
  {
    path: "email-list-sub",
    component: EmailListSubComponent,
    data: { title: "emailListSub" },
  },
  {
    path: "email-campain",
    component: EmailCampainComponent,
    data: { title: "emailCampain" },
  },
  {
    path: "report-list",
    component: ReportListComponent,
    data: { title: "reportList" },
  },
  {
    path: "report-detail",
    component: ReportDetailComponent,
    data: { title: "reportDetail" },
  },
  {
    path: "report-list-account",
    component: ReportListAccountComponent,
    data: { title: "reportListAccount" },
  },
  {
    path: "logistic_company",
    component: ListCompanyLogisticComponent,
    data: { title: "listCompanyLogistic" },
  },
  {
    path: "trasport_company",
    component: ListCompanyTransportComponent,
    data: { title: "listCompanyTransport" },
  },
  {
    path: "email-campain-detail",
    component: EmailCampainDetailComponent,
    data: { title: "mailCampainDetail" },
  },
  {
    path: "email-list-sub-report",
    component: EmailListSubReportComponent,
    data: { title: "mailListSubReport" },
  },
  {
    path: "report-list-maillist",
    component: ReportListMaillistComponent,
    data: { title: "reportListMaillist" },
  },
  {
    path: "report-list-maillist-detail",
    component: ReportListMaillistDetailComponent,
    data: { title: "reportListMaillistDetail" },
  },
  {
    path: "category-city",
    component: CategoryCityComponent,
    data: { title: "CategoryCity" },
  },
  {
    path: "category-step",
    component: CategoryStepComponent,
    data: { title: "CategoryStep" },
  },
  {
    path: "category-country",
    component: CategoryCountryComponent,
    data: { title: "CategoryCountry" },
  },
  {
    path: "job-tile",
    component: CategoryJobTileComponent,
    data: { title: "CategoryJobTile" },
  },
  {
    path: "call-outcome",
    component: CategoryCallOutcomeComponent,
    data: { title: "CategoryCallOutcome" },
  },
  {
    path: "mail-outcome",
    component: CategoryMailOutcomeComponent,
    data: { title: "CategoryMailOutcome" },
  },
  {
    path: "list-user",
    component: CategoryUserComponent,
    data: { title: "CategoryUser" },
  },
  {
    path: "history",
    component: ListHistoryComponent,
    data: { title: "History" },
  },
  {
    path: "mailmerge-template-list",
    component: MailmergeTemplateListComponent,
    data: { title: "MailmergeTemplateList" },
  },
  {
    path: "mailmerge-campaign-list",
    component: MailmergeCampaignListComponent,
    data: { title: "MailmergeCampaignList" },
  },
  {
    path: "setup-follow-mailmerge-campaign",
    component: SetupFollowMailmergeCampaignComponent,
    data: { title: "SetupFollowMailmergeCampaign" },
  },
  {
    path: "mailmerge-template-detail",
    component: MailmergeTemplateDetailComponent,
    data: { title: "MailmergeTemplateDetail" },
  },
  {
    path: "add-items-to-mailmerge-campaign",
    component: AddItemsToMailmergeCampaignComponent,
    data: { title: "AddItemsToMailmergeCampaign" },
  },
  {
    path: "add-mailmerge-template",
    component: AddMailmergeTemplateComponent,
    data: { title: "AddMailmergeTemplate" },
  },
  {
    path: "address-book",
    component: AddressBookComponent,
    data: { title: "AddressBook" },
  },
  {
    path: "address-book-detail",
    component: AddressBookDetailComponent,
    data: { title: "AddressBookDetail" },
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
