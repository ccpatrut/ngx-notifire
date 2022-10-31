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
import { NotificationDefaults } from '../defaults/defaults.interface';
import { NotificationModel } from '../models/notification.model';
import { NotifireModel } from '../components/toast/notifire-toast.model';
import { mergeDeep, uuid } from '../utils';

@Injectable()
export class NotificationService {
  /**
   * Minimum display time of the notification message
   */
  private readonly minimumDisplayedTime = 3000;

  /**
   * Emits Notifire Notifications
   */
  readonly emitter = new Subject<NotifireModel[]>();

  readonly toastDeleted = new Subject<number>();
  readonly toastChanged = new Subject<NotifireModel>();

  notifications: Array<NotifireModel> = [];

  constructor(
    @Inject('NotifireConfig') public defaultConfig: NotificationDefaults
  ) {}

  /**
   * Creates toast and add it to array, returns toast id
   * @param NotificationModel NotificationModel
   * @return number
   */
  create(notif: NotificationModel): NotifireModel {
    if (this.defaultConfig.type && notif.config && notif.config.type) {
      const config = mergeDeep(
        this.defaultConfig.toast,
        this.defaultConfig.type[notif.config.type],
        notif.config
      );
      const toast = new NotifireModel(
        uuid(),
        notif.title ? notif.title : '',
        notif.body ? notif.body : '',
        config
      );
      this.add(toast);
      return toast;
    }
    const defaulToast = new NotifireModel(
      uuid(),
      notif.title ? notif.title : '',
      notif.body ? notif.body : '',
      this.defaultConfig.toast
    );
    this.add(defaulToast);
    return defaulToast;
  }
  /**
   * If ID passed, emits toast animation remove, if ID & REMOVE passed, removes toast from notifications array
   * @param id number
   * @param remove boolean
   */
  remove(id: number, remove?: boolean): void {
    if (!id) {
      return this.clear();
    }
    if (remove) {
      this.notifications = this.notifications.filter(
        (toast) => toast.id !== id
      );
      return this.emit();
    }
    this.toastDeleted.next(id);
  }

  setDefaults(defaults: NotificationDefaults): NotificationDefaults {
    const mergedConfig = (this.defaultConfig = mergeDeep(
      this.defaultConfig,
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
  private add(toast: NotifireModel): void {
    if (
      this.defaultConfig &&
      this.defaultConfig.global &&
      this.defaultConfig.global.filterDuplicates &&
      this.containsToast(toast)
    ) {
      return;
    }
    if (
      this.defaultConfig &&
      this.defaultConfig.global &&
      this.defaultConfig.global.newOnTop
    ) {
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
  private containsToast(inToast: NotifireModel): boolean {
    return this.notifications.some((toast) => toast.equals(inToast));
  }

  /**
   * Creates empty toast with html string inside
   * @param html string | SafeHtml
   * @param config NotifireConfig
   * @returns number
   */
  html(html: string | SafeHtml, config?: NotifireConfig): NotifireModel {
    return this.create({
      title: undefined,
      body: undefined,
      config: {
        ...config,
        ...{ html },
      },
    });
  }
  /**
   * Create toast with success style returns toast id;
   * @param body string
   * @returns number
   */
  success(body: string): NotifireModel;
  /**
   * Create toast with success style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  success(body: string, title: string): NotifireModel;
  /**
   * Create toast with success style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  success(body: string, config: NotifireConfig): NotifireModel;
  /**
   * Create toast with success style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  success(body: string, title: string, config: NotifireConfig): NotifireModel;

  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  success(args: any): NotifireModel {
    return this.create(args);
  }

  /**
   * Create toast with error style returns toast id;
   * @param body string
   * @returns number
   */
  error(body: string): NotifireModel;
  /**
   * Create toast with error style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  error(body: string, title: string): NotifireModel;
  /**
   * Create toast with error style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  error(body: string, config: NotifireConfig): NotifireModel;
  /**
   * Create toast with error style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  error(body: string, title: string, config: NotifireConfig): NotifireModel;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  error(args: any): NotifireModel {
    return this.create(args);
  }

  /**
   * Create toast with info style returns toast id;
   * @param body string
   * @returns number
   */
  info(body: string): NotifireModel;
  /**
   * Create toast with info style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  info(body: string, title: string): NotifireModel;
  /**
   * Create toast with info style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  info(body: string, config: NotifireConfig): NotifireModel;
  /**
   * Create toast with info style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  info(body: string, title: string, config: NotifireConfig): NotifireModel;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  info(args: any): NotifireModel {
    return this.create(args);
  }

  /**
   * Create toast with warning style returns toast id;
   * @param body string
   * @returns number
   */
  warning(body: string): NotifireModel;
  /**
   * Create toast with warning style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  warning(body: string, title: string): NotifireModel;
  /**
   * Create toast with warning style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  warning(body: string, config: NotifireConfig): NotifireModel;
  /**
   * Create toast with warning style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  warning(body: string, title: string, config: NotifireConfig): NotifireModel;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  warning(args: any): NotifireModel {
    return this.create(args);
  }

  /**
   * Create toast with confirm style returns toast id;
   * @param body string
   * @returns number
   */
  confirm(body: string): NotifireModel;
  /**
   * Create toast with confirm style returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  confirm(body: string, title: string): NotifireModel;
  /**
   * Create toast with confirm style returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  confirm(body: string, config: NotifireConfig): NotifireModel;
  /**
   * Create toast with confirm style  returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  confirm(body: string, title: string, config: NotifireConfig): NotifireModel;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  confirm(args: any): NotifireModel {
    return this.create(args);
  }

  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param body string
   * @returns number
   */
  prompt(body: string): NotifireModel;
  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param body string
   * @param title string
   * @returns number
   */
  prompt(body: string, title: string): NotifireModel;
  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param body string
   * @param config NotificationConfig
   * @returns number
   */
  prompt(body: string, config: NotifireConfig): NotifireModel;
  /**
   * Create toast with Prompt style with two buttons, returns toast id;
   * @param [body] string
   * @param [title] string
   * @param [config] NotificationConfig
   * @returns number
   */
  prompt(body: string, title: string, config: NotifireConfig): NotifireModel;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  prompt(args: any): NotifireModel {
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
  ): NotifireModel;
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
  ): NotifireModel;
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
  ): NotifireModel;
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
  ): NotifireModel;
  /**
   * Transform toast arguments into NotificationModel object
   */
  @TransformArgument
  /**
   * Determines current toast type and collects default configuration
   */
  @SetToastType
  async(args: any): NotifireModel {
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
    if (type && this.defaultConfig) {
      toast.config = mergeDeep(
        toast.config,
        this.defaultConfig.global,
        this.defaultConfig.toast?.type,
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
}
