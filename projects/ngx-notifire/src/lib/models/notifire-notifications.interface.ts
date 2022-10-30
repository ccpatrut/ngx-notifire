import { NotifireToast } from './notifire-toast.model';

export interface NotifireNotifications {
  leftTop?: NotifireToast[];
  leftCenter?: NotifireToast[];
  leftBottom?: NotifireToast[];

  rightTop?: NotifireToast[];
  rightCenter?: NotifireToast[];
  rightBottom?: NotifireToast[];

  centerTop?: NotifireToast[];
  centerCenter?: NotifireToast[];
  centerBottom?: NotifireToast[];
}
