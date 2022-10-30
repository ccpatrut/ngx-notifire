import { Inject, Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { SetToastType } from '../decorators/set-toast-type.decorator';
import { TransformArgument } from '../decorators/transform-argument.decorator';
import {
  NotifireConfig,
  NotificationEventType,
  NotificationType,
} from '../models';
import { NotificationDefaults } from '../models/defaults.interface';
import { NotificationModel } from '../models/notification.model';
import { NotifireToast } from '../models/notifire-toast.model';
import { mergeDeep, uuid } from '../utils';

@Injectable()
export class NotificationService {
  /**
   * Minimum display time of the notification message
   */
  private readonly minimumDisplayedTime = 3000;
  readonly emitter = new Subject<NotifireToast[]>();
  readonly toastDeleted = new Subject<number>();
  readonly toastChanged = new Subject<NotifireToast>();

  notifications: Array<NotifireToast> = [];

  constructor(@Inject('NotifireConfig') public config: NotificationDefaults) {}

  /**
   * Creates toast and add it to array, returns toast id
   * @param NotificationModel NotificationModel
   * @return number
   */
  create(notif: NotificationModel): NotifireToast {
    if (this.config.type && notif.config && notif.config.type) {
      const config = mergeDeep(
        this.config.toast,
        this.config.type[notif.config.type],
        notif.config
      );
      const toast = new NotifireToast(
        uuid(),
        notif.title ? notif.title : '',
        notif.body ? notif.body : '',
        config
      );
      this.add(toast);
      return toast;
    }
    const defaulToast = new NotifireToast(
      uuid(),
      notif.title ? notif.title : '',
      notif.body ? notif.body : '',
      this.config.toast
    );
    this.add(defaulToast);
    return defaulToast;
  }
  /**
   * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
   * @param id number
   * @param remove boolean
   */
  remove(id?: number, remove?: boolean): void {
    if (!id) {
      return this.clear();
    } else if (remove) {
      this.notifications = this.notifications.filter(
        (toast) => toast.id !== id
      );
      return this.emit();
    }
    this.toastDeleted.next(id);
  }

  setDefaults(defaults: NotificationDefaults): NotificationDefaults {
    const mergedConfig = (this.config = mergeDeep(
      this.config,
      defaults
    ) as NotificationDefaults);
    return mergedConfig;
  }
  /**
   * Clear notifications array
   */
  clear(): void {
    this.notifications = [];
    this.emit();
  }
  /**
   * add NotifireToast to notifications array
   * @param toast NotifireToast
   */
  private add(toast: NotifireToast): void {
    if (
      this.config &&
      this.config.global &&
      this.config.global.filterDuplicates &&
      this.containsToast(toast)
    ) {
      return;
    }
    if (this.config && this.config.global && this.config.global.newOnTop) {
      this.notifications.unshift(toast);
    } else {
      this.notifications.push(toast);
    }
    this.emit();
  }
  /**
   * emit changes in notifications array
   */
  private emit(): void {
    this.emitter.next(this.notifications.slice());
  }
  /**
   * checks if the toast is in the collection.
   * @param inToast NotifireToast
   * @returns boolean
   */
  private containsToast(inToast: NotifireToast): boolean {
    return this.notifications.some((toast) => toast.equals(inToast));
  }

  /**
   *
   * @param message parameter for which the reading length time will be calculates
   * @returns
   */
  private calculateTtlForMessage(message: string): number {
    const countOfSpaces = message.split(' ').length - 1;
    const time = countOfSpaces * 480;
    return time > 2500 ? time : this.minimumDisplayedTime;
  }

  /**
   * Create toast with success style returns toast id;
   * @param body string
   * @returns number
   */
  success(body: string): NotifireToast;
  /**
   * Create toast with success style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  success(body: string, title: string): NotifireToast;
  /**
   * Create toast with success style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  success(body: string, config: NotifireConfig): NotifireToast;
  /**
   * Create toast with success style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  success(body: string, title: string, config: NotifireConfig): NotifireToast;

  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  success(args: any): NotifireToast {
    return this.create(args);
  }

  /**
   * Create toast with error style returns toast id;
   * @param body string
   * @returns number
   */
  error(body: string): NotifireToast;
  /**
   * Create toast with error style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  error(body: string, title: string): NotifireToast;
  /**
   * Create toast with error style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  error(body: string, config: NotifireConfig): NotifireToast;
  /**
   * Create toast with error style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  error(body: string, title: string, config: NotifireConfig): NotifireToast;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  error(args: any): NotifireToast {
    return this.create(args);
  }

  /**
   * Create toast with info style returns toast id;
   * @param body string
   * @returns number
   */
  info(body: string): NotifireToast;
  /**
   * Create toast with info style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  info(body: string, title: string): NotifireToast;
  /**
   * Create toast with info style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  info(body: string, config: NotifireConfig): NotifireToast;
  /**
   * Create toast with info style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  info(body: string, title: string, config: NotifireConfig): NotifireToast;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  info(args: any): NotifireToast {
    return this.create(args);
  }

  /**
   * Create toast with warning style returns toast id;
   * @param body string
   * @returns number
   */
  warning(body: string): NotifireToast;
  /**
   * Create toast with warning style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  warning(body: string, title: string): NotifireToast;
  /**
   * Create toast with warning style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  warning(body: string, config: NotifireConfig): NotifireToast;
  /**
   * Create toast with warning style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  warning(body: string, title: string, config: NotifireConfig): NotifireToast;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  warning(args: any): NotifireToast {
    return this.create(args);
  }

  /**
   * Create toast with confirm style returns toast id;
   * @param body string
   * @returns number
   */
  confirm(body: string): NotifireToast;
  /**
   * Create toast with confirm style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  confirm(body: string, title: string): NotifireToast;
  /**
   * Create toast with confirm style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  confirm(body: string, config: NotifireConfig): NotifireToast;
  /**
   * Create toast with confirm style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  confirm(body: string, title: string, config: NotifireConfig): NotifireToast;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  confirm(args: any): NotifireToast {
    return this.create(args);
  }

  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param body string
   * @returns number
   */
  prompt(body: string): NotifireToast;
  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  prompt(body: string, title: string): NotifireToast;
  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  prompt(body: string, config: NotifireConfig): NotifireToast;
  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  prompt(body: string, title: string, config: NotifireConfig): NotifireToast;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  prompt(args: any): NotifireToast {
    return this.create(args);
  }

  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   * @param body string
   * @param action Promise<NotificationModel> | Observable<NotificationModel>
   * @returns number
   */
  async(
    body: string,
    action: Promise<NotificationModel> | Observable<NotificationModel>
  ): NotifireToast;
  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   * @param body string
   * @param title string
   * @param action Promise<NotificationModel> | Observable<NotificationModel>
   * @returns number
   */
  async(
    body: string,
    title: string,
    action: Promise<NotificationModel> | Observable<NotificationModel>
  ): NotifireToast;
  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   * @param body string
   * @param action Promise<NotificationModel> | Observable<NotificationModel>
   * @param [config] NotificationConfig
   * @returns number
   */
  async(
    body: string,
    action: Promise<NotificationModel> | Observable<NotificationModel>,
    config: NotifireConfig
  ): NotifireToast;
  /**
   * Creates async toast with Info style. Pass action, and resolve or reject it.
   * @param body string
   * @param title string
   * @param action Promise<NotificationModel> | Observable<NotificationModel>
   * @param [config] NotificationConfig
   * @returns number
   */
  async(
    body: string,
    title: string,
    action: Promise<NotificationModel> | Observable<NotificationModel>,
    config: NotifireConfig
  ): NotifireToast;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  async(args: any): NotifireToast {
    let async: Observable<any>;
    if (args.action instanceof Promise) {
      async = from(args.action);
    } else {
      async = args.action;
    }

    const toast = this.create(args);

    toast.on(NotificationEventType.MOUNTED, () => {
      const subscription: Subscription = async.subscribe({
        next: (next?: NotificationModel) => {
          this.mergeToast(toast, next);
        },
        error: (error?: NotificationModel) => {
          this.mergeToast(toast, error, NotificationType.ERROR);
          subscription.unsubscribe();
        },
        complete: () => {
          this.mergeToast(toast, {}, NotificationType.SUCCESS);
          subscription.unsubscribe();
        },
      });
    });

    return toast;
  }

  private mergeToast(toast: any, next: any, type?: NotificationType) {
    if (next.body) {
      toast.body = next.body;
    }
    if (next.title) {
      toast.title = next.title;
    }
    if (type && this.config) {
      toast.config = mergeDeep(
        toast.config,
        this.config.global,
        this.config.toast?.type,
        { type },
        next.config
      );
    } else {
      toast.config = mergeDeep(toast.config, next.config);
    }
    if (next.html) {
      toast.config.html = next.html;
    }
    this.emit();
    this.toastChanged.next(toast);
  }

  /**
   * Creates empty toast with html string inside
   * @param html string | SafeHtml
   * @param config SnotifyToastConfig
   * @returns number
   */
  html(html: string | SafeHtml, config?: NotifireConfig): NotifireToast {
    return this.create({
      title: undefined,
      body: undefined,
      config: {
        ...config,
        ...{ html },
      },
    });
  }
}
