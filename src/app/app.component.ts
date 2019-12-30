import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-logistic-crm';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'notification',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/notification.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/search.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'calendar',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/calendar.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'chat',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/chat.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'clock',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/clock.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'company',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/company.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'email',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/email.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'note',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/note.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'phone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/phone.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'task',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/task.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/edit.svg')
    );



    this.matIconRegistry.addSvgIcon(
      'note_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/note_circle.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'call_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/call_circle.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'task_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/task_circle.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'meet_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/meet_circle.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'email_circle',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/email_circle.svg')
    );
  }

}
