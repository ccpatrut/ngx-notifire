import { NotificationPositionType, NotificationType } from '../models';

/**
 * Snotify default configuration object
 */
export const ToastDefaults = {
  global: {
    newOnTop: true,
    maxOnScreen: 8,
    maxAtPosition: 8,
    filterDuplicates: false,
  },
  toast: {
    type: NotificationType.INFO,
    showProgressBar: true,
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    bodyMaxLength: 150,
    titleMaxLength: 16,
    backdrop: -1,
    icon: undefined,
    iconClass: undefined,
    html: undefined,
    position: NotificationPositionType.RIGHT_BOTTOM,
    animation: { enter: 'fadeIn', exit: 'fadeOut', time: 400 },
  },
  type: {
    [NotificationType.PROMPT]: {
      timeout: 0,
      closeOnClick: false,
      buttons: [
        { text: 'Ok', action: null, bold: true },
        { text: 'Cancel', action: null, bold: false },
      ],
      placeholder: 'Enter answer here...',
      type: NotificationType.PROMPT,
    },
    [NotificationType.CONFIRM]: {
      timeout: 0,
      closeOnClick: false,
      buttons: [
        { text: 'Ok', action: null, bold: true },
        { text: 'Cancel', action: null, bold: false },
      ],
      type: NotificationType.CONFIRM,
    },
    [NotificationType.SUCCESS]: {
      type: NotificationType.SUCCESS,
    },
    [NotificationType.ERROR]: {
      type: NotificationType.ERROR,
    },
    [NotificationType.WARNING]: {
      type: NotificationType.WARNING,
    },
    [NotificationType.INFO]: {
      type: NotificationType.INFO,
    },
    [NotificationType.ASYNC]: {
      pauseOnHover: false,
      closeOnClick: false,
      timeout: 0,
      showProgressBar: false,
      type: NotificationType.ASYNC,
    },
  },
};
