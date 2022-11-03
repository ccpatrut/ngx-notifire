import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifireModule, NotificationService } from 'ngx-notifire';
import { ToastDefaults } from 'projects/ngx-notifire/src/lib/defaults/toast-defaults';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxNotifireModule, BrowserAnimationsModule],
  providers: [
    { provide: 'NotifireConfig', useValue: ToastDefaults },
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
