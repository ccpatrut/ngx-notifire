import { NgModule } from '@angular/core';
import { PromptComponent } from './components/prompt/prompt.component';
import { ToastComponent } from './components/toast/toast.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes';
import { NgxNotifireComponent } from './components/ngx-notifire/ngx-notifire.component';

@NgModule({
  declarations: [
    PromptComponent,
    ToastComponent,
    ButtonsComponent,
    TruncatePipe,
    NgxNotifireComponent,
  ],
  imports: [CommonModule],
  exports: [NgxNotifireComponent],
})
export class NgxNotifireModule {}
