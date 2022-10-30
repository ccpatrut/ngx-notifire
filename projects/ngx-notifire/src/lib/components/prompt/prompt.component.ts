import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationEventType } from '../../models';
import { NotifireToast } from '../../models/notifire-toast.model';

@Component({
  selector: 'lib-prompt',
  templateUrl: './prompt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PromptComponent {
  inputType = NotificationEventType.INPUT;
  /**
   * Get PROMPT placeholder
   */
  @Input() toast!: NotifireToast;
  /**
   * Is PROMPT focused
   */
  isPromptFocused = false;

  getValue($event: any): string {
    return $event.target.value;
  }
}
