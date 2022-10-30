import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotifireModule } from 'ngx-notifire';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxNotifireModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
