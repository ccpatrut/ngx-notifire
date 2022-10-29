import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationModel } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * Minimum display time of the notification message
   */
  private readonly minimumDisplayedTime = 3000;

  notifications: Set<NotificationModel> = new Set();

  constructor() {}

  //merge deep methos is used to merge main config with esmall one
  create(notification: NotificationModel) {}

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
}
