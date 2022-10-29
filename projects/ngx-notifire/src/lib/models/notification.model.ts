import { SafeHtml } from '@angular/platform-browser';
import { NotificationConfig } from './notification-config.interface';
import { NotificationType } from './notification-type.model';

export class NotificationModel {
  constructor(
    public readonly type: NotificationType,
    /**
     * Notification Title
     */
    public readonly title: string,
    /**
     * Notification message
     */
    public readonly body: string,
    /**
     * Config object
     */
    public readonly config: NotificationConfig,
    /**
     * Html content
     */
    public readonly html?: string | SafeHtml
  ) {}
}
