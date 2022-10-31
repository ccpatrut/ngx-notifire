import { Subject, Subscription } from 'rxjs';
import { NotifireConfig } from '../../models/notification-config.interface';
import { NotificationEventType } from '../../models/notification-event-type.model';
import { NotificationType } from '../../models/notification-type.model';

/**
 * Toast main model
 */
export class NotifireModel {
  /**
   * Emits NotifireEventType
   */
  readonly eventEmitter = new Subject<NotificationEventType>();

  /**
   * Holds all subscribers because we need to unsubscribe from all before toast get destroyed
   */
  private eventsHolder: Subscription[] = [];

  /**
   * Toast prompt value
   */
  value?: string;

  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly body: string,
    public readonly config: NotifireConfig
  ) {
    if (this.config && this.config.type === NotificationType.PROMPT) {
      this.value = '';
    }
    this.on(NotificationEventType.HIDDEN, () => {
      this.eventsHolder.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
    });
  }
  /**
   * Subscribe to toast events
   * @returns this
   * @param event NotificationEventType
   * @param action (toast: this) => void
   */
  on(event: NotificationEventType, action: (toast: this) => void): this {
    this.eventsHolder.push(
      this.eventEmitter.subscribe((e: NotificationEventType) => {
        if (e === event) {
          action(this);
        }
      })
    );
    return this;
  }

  /**
   * Tests if a toast equals this toast.
   * @returns boolean true then equals else false.
   * @param toast SnotifyToast
   */
  equals(toast: NotifireModel): boolean {
    return this.config && toast.config
      ? this.body === toast.body &&
          this.title === toast.title &&
          this.config.type === toast.config.type
      : this.body === toast.body && this.title === toast.title;
  }
}
