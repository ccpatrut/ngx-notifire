import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifireModule, NotificationService } from 'ngx-notifire';
import { ToastDefaults } from 'projects/ngx-notifire/src/lib/defaults/toast-defaults';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxNotifireModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  providers: [
    { provide: 'NotifireConfig', useValue: ToastDefaults },
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
