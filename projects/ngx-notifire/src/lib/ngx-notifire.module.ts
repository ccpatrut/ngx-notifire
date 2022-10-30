import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptComponent } from './components/prompt/prompt.component';
import { ToastComponent } from './components/toast/toast.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { KeysPipe, TruncatePipe } from './pipes';
import { NgxNotifireComponent } from './components/ngx-notifire/ngx-notifire.component';
import { NotificationService } from './services';

@NgModule({
  declarations: [
    PromptComponent,
    ToastComponent,
    ButtonsComponent,
    TruncatePipe,
    NgxNotifireComponent,
    KeysPipe,
  ],
  imports: [CommonModule],
  exports: [NgxNotifireComponent],
})
export class NgxNotifireModule {
  static forRoot(): ModuleWithProviders<NgxNotifireModule> {
    return {
      ngModule: NgxNotifireModule,
      providers: [NotificationService],
    };
  }
}
