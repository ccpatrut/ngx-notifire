import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifireModule, NotificationService } from 'ngx-notifire';
import { ToastDefaults } from 'projects/ngx-notifire/src/lib/toast-defaults';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxNotifireModule],
  providers: [
    { provide: 'NotifireConfig', useValue: ToastDefaults },
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
