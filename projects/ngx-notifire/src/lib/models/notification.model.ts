import { SafeHtml } from '@angular/platform-browser';
import { NotificationConfig } from './notification-config.interface';
import { NotificationType } from './notification-type.model';

export class NotificationModel {
  constructor(
    public type?: NotificationType,
    /**
     * Notification Title
     */
    public title?: string,
    /**
     * Notification message
     */
    public body?: string,
    /**
     * Config object
     */
    public config?: NotificationConfig,
    /**
     * Html content
     */
    public html?: string | SafeHtml
  ) {}
}
