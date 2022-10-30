import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NotificationEventType, NotificationPositionType } from '../../models';
import { NotifireNotifications } from '../../models/notifire-notifications.interface';
import { NotifireToast } from '../../models/notifire-toast.model';
import { NotificationService } from '../../services';

@Component({
  selector: 'ngx-notifire',
  templateUrl: './ngx-notifire.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgxNotifireComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  /**
   * Toasts array
   */
  notifications!: NotifireNotifications;
  /**
   * Toasts emitter
   */
  emitter!: Subscription;
  /**
   * Helper for slice pipe (maxOnScreen)
   */
  dockSizeA!: number;
  /**
   * Helper for slice pipe (maxOnScreen)
   */
  dockSizeB!: number | undefined;
  /**
   * Helper for slice pipe (maxAtPosition)
   */
  blockSizeA!: number;
  /**
   * Helper for slice pipe (maxAtPosition)
   */
  blockSizeB!: number | undefined;
  /**
   * Backdrop Opacity
   */
  backdrop = -1;

  constructor(private readonly service: NotificationService) {}

  ngOnInit(): void {
    this.service.emitter.subscribe((toasts: NotifireToast[]) => {
      if (
        this.service.config &&
        this.service.config.global &&
        this.service.config.global.newOnTop
      ) {
        this.dockSizeA = this.service.config.global.maxOnScreen
          ? -this.service.config.global.maxOnScreen
          : 6;
        this.dockSizeB = undefined;
        this.blockSizeA = this.service.config.global.maxAtPosition
          ? -this.service.config.global.maxAtPosition
          : 4;
        this.blockSizeB = undefined;
      } else {
        this.dockSizeA = 0;
        this.dockSizeB =
          this.service.config.global && this.service.config.global.maxOnScreen;
        this.blockSizeA = 0;
        this.blockSizeB =
          this.service.config.global &&
          this.service.config.global.maxAtPosition;
      }
      this.notifications = this.splitToasts(
        toasts.slice(this.dockSizeA, this.dockSizeB)
      );
      this.stateChanged(NotificationEventType.MOUNTED);
    });
  }

  /**
   * Split toasts toasts into different objects
   * @param toasts SnotifyToast[]
   * @returns SnotifyNotifications
   */
  splitToasts(toasts: NotifireToast[]): NotifireNotifications {
    const result: NotifireNotifications = {};

    for (const property in NotificationPositionType) {
      if (NotificationPositionType.hasOwnProperty(property)) {
        result[
          NotificationPositionType[
            property as keyof typeof NotificationPositionType
          ]
        ] = [];
      }
    }

    toasts.forEach((toast: NotifireToast) => {
      result[toast.config?.position as NotificationPositionType]?.push(toast);
    });

    return result;
  }

  getNotificationArray(
    notifications: NotifireNotifications,
    position: NotificationPositionType
  ): NotifireToast[] | undefined {
    return notifications[position];
  }

  // TODO: do I want to offer it?
  /**
   * Changes the backdrop opacity
   * @param event NotificationEventType
   */
  stateChanged(event: NotificationEventType) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
