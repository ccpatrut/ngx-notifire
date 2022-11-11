import { ModuleWithProviders, NgModule } from '@angular/core';
import { PromptComponent } from './components/prompt/prompt.component';
import { ToastComponent } from './components/toast/toast.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { KeysPipe, TruncatePipe } from './pipes';
import { NgxSnotifireComponent } from './components/ngx-notifire/ngx-snotifire.component';
import { NotificationService } from './services';

@NgModule({
  declarations: [
    PromptComponent,
    ToastComponent,
    ButtonsComponent,
    TruncatePipe,
    NgxSnotifireComponent,
    KeysPipe,
  ],
  imports: [CommonModule],
  exports: [NgxSnotifireComponent],
})
export class NgxNotifireModule {
  static forRoot(): ModuleWithProviders<NgxNotifireModule> {
    return {
      ngModule: NgxNotifireModule,
      providers: [NotificationService],
    };
  }
}
