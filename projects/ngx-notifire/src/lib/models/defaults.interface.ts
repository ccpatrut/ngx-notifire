import { NotificationGlobalConfig } from './global-config.interface';
import { NotifireConfig } from './notification-config.interface';

/**
 * Global configuration object
 */
export interface NotificationDefaults {
  global?: NotificationGlobalConfig;
  toast?: NotifireConfig;
  type?: {
    [key: string]: NotifireConfig;
  };
}
