import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { NotificationEventType, NotificationType } from '../../models';
import { NotifireToast } from '../../models/notifire-toast.model';
import { NotificationService } from '../../services';

@Component({
  selector: 'lib-toast',
  templateUrl: './toast.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ToastComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  /**
   * Get toast from notifications array
   */
  @Input() toast!: NotifireToast;
  @Output() stateChanged = new EventEmitter<NotificationEventType>();

  /**
   * requestAnimationFrame id
   */
  animationFrame!: number;

  /**
   * Toast state
   */
  state = {
    paused: false,
    progress: 0,
    animation: '',
    isDestroying: false,
    promptType: NotificationType.PROMPT,
  };

  constructor(private readonly service: NotificationService) {}

  ngOnInit(): void {
    this.service.toastChanged
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((toast: NotifireToast) => {
        if (this.toast.id === toast.id) {
          this.initToast();
        }
      });

    this.service.toastDeleted
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        if (this.toast.id === id) {
          this.onRemove();
        }
      });
    if (this.toast && this.toast.config && !this.toast.config.timeout) {
      this.toast.config.showProgressBar = false;
    }

    this.toast.eventEmitter.next(NotificationEventType.MOUNTED);
    this.state.animation = 'snotifyToast--in';
  }

  /**
   * Trigger beforeDestroy lifecycle. Removes toast
   */
  onRemove() {
    this.state.isDestroying = true;
    this.toast.eventEmitter.next(NotificationEventType.BEFORE_HIDE);
    this.stateChanged.emit(NotificationEventType.BEFORE_HIDE);
    this.state.animation =
      (this.toast.config &&
        this.toast.config.animation &&
        this.toast.config.animation.exit) ||
      '';
    setTimeout(() => {
      this.stateChanged.emit(NotificationEventType.HIDDEN);
      this.state.animation = 'snotifyToast--out';
      this.toast.eventEmitter.next(NotificationEventType.HIDDEN);
      setTimeout(
        () => this.service.remove(this.toast.id, true),
        this.toast.config &&
          this.toast.config.animation &&
          this.toast.config.animation.time / 2
      );
    }, this.toast.config && this.toast.config.animation && this.toast.config.animation.time / 2);
  }
  /**
   * Trigger OnClick lifecycle
   */
  onClick() {
    this.toast.eventEmitter.next(NotificationEventType.CLICK);
    if (this.toast && this.toast.config && this.toast.config.closeOnClick) {
      this.service.remove(this.toast.id);
    }
  }
  /**
   * Trigger onHoverEnter lifecycle
   */
  onMouseEnter() {
    this.toast.eventEmitter.next(NotificationEventType.MOUSE_ENTER);
    if (this.toast && this.toast.config && this.toast.config.pauseOnHover) {
      this.state.paused = true;
    }
  }

  /**
   * Trigger onHoverLeave lifecycle
   */
  onMouseLeave() {
    if (
      this.toast &&
      this.toast.config &&
      this.toast.config.pauseOnHover &&
      this.toast.config.timeout
    ) {
      this.state.paused = false;
      this.startTimeout(this.toast.config.timeout * this.state.progress);
    }
    this.toast.eventEmitter.next(NotificationEventType.MOUSE_LEAVE);
  }
  /**
   * Remove toast completely after animation
   */
  onExitTransitionEnd() {
    if (this.state.isDestroying) {
      return;
    }
    this.initToast();
    this.toast.eventEmitter.next(NotificationEventType.SHOWN);
  }

  /*
   Common
   */

  /**
   * Initialize base toast config
   *
   */
  initToast(): void {
    if (
      (this.toast && this.toast.config && this.toast.config.timeout
        ? this.toast.config.timeout
        : 0) > 0
    ) {
      this.startTimeout(0);
    }
  }
  /**
   * Start progress bar
   * @param startTime number
   */
  startTimeout(startTime: number = 0) {
    const start = performance.now();
    const calculate = () => {
      this.animationFrame = requestAnimationFrame((timestamp) => {
        const runtime = timestamp + startTime - start;
        const progress = Math.min(
          runtime /
            (this.toast && this.toast.config && this.toast.config.timeout
              ? this.toast.config.timeout
              : 1),
          1
        );
        if (this.state.paused) {
          cancelAnimationFrame(this.animationFrame);
        } else if (
          runtime <
          (this.toast && this.toast.config && this.toast.config.timeout
            ? this.toast.config.timeout
            : 1)
        ) {
          this.state.progress = progress;
          calculate();
        } else {
          this.state.progress = 1;
          cancelAnimationFrame(this.animationFrame);
          this.service.remove(this.toast.id);
        }
      });
    };
    calculate();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
