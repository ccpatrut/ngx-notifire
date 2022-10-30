import { SafeHtml } from '@angular/platform-browser';
import { NotifireConfig } from './notification-config.interface';
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
    public config?: NotifireConfig,
    /**
     * Html content
     */
    public html?: string | SafeHtml
  ) {}
}
