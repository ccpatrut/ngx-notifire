import { NotificationGlobalConfig } from './global-config.interface';
import { SnotifireConfig } from '../models/snotifire-config.interface';

/**
 * Global configuration object
 */
export interface NotificationDefaults {
  global?: NotificationGlobalConfig;
  toast: SnotifireConfig;
  type?: {
    [key: string]: SnotifireConfig;
  };
}
