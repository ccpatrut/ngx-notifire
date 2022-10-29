import { NotificationGlobalConfig } from './global-config.interface';
import { NotificationConfig } from './notification-config.interface';

/**
 * Global configuration object
 */
export interface NotificationDefaults {
  global?: NotificationGlobalConfig;
  toast?: NotificationConfig;
  type?: {
    [key: string]: NotificationConfig;
  };
}
