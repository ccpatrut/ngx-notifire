import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NotificationPositionType,
  NotificationService,
  NotifireConfig,
  ToastDefaults,
} from 'ngx-notifire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  snotifireForm: FormGroup;
  positions: string[];
  themes = ['material', 'dark', 'simple'];
  style = 'material';

  constructor(
    protected readonly iconRegistry: MatIconRegistry,
    protected readonly sanitizer: DomSanitizer,
    readonly notificationService: NotificationService,
    private readonly fb: FormBuilder
  ) {
    this.positions = Object.keys(NotificationPositionType);
    this.snotifireForm = this.fb.group({
      toastData: this.fb.group({
        title: ['Notification title!', [Validators.required]],
        body: ['Lorem ipsum dolor sit amet!', [Validators.required]],
      }),
      toastFunctionalConfig: this.fb.group({
        titleMaxLength: ['15', [Validators.required]],
        boydMaxLength: ['78', [Validators.required]],
        timeout: ['3000', [Validators.required]],
        backdrop: ['-1', [Validators.required]],
      }),
      toastVisualConfig: this.fb.group({
        isShowProgressBar: [true],
        isCloseOnClick: [true],
        isPauseOnHover: [true],
        isNewItemsOnTop: [true],
        isFilterDuplicates: [false],
      }),
      position: [this.positions[3]],
      notificationConf: this.fb.group({
        maxOnScreen: [6, [Validators.required]],
        maxAtPosition: [4, [Validators.required]],
      }),
      toastStyle: [this.themes[0], [Validators.required]],
    });
    this.addIcon('icon-fire', 'fire');
  }
  ngOnInit(): void {}

  protected addIcon(iconName: string, location: string): void {
    this.iconRegistry.addSvgIcon(
      iconName,
      this.sanitizer.bypassSecurityTrustResourceUrl(this.getSvg(location))
    );
  }

  get positionFormControl(): FormControl | null {
    return this.snotifireForm.get('position') as FormControl;
  }

  get themeControl(): FormControl | null {
    return this.snotifireForm.get('toastStyle') as FormControl;
  }

  getConfig(): NotifireConfig {
    console.log(this.snotifireForm.getRawValue());
    this.notificationService.setDefaults({
      global: {
        newOnTop: this.visualConfig.isNewItemsOnTop,
        maxAtPosition: this.notificationConfig.maxAtPosition,
        maxOnScreen: this.notificationConfig.maxOnScreen,
        // @ts-ignore
        filterDuplicates: this.visualConfig.isFilterDuplicates,
      },
      toast: ToastDefaults.toast,
    });
    return {
      bodyMaxLength: this.functionalConfig.boydMaxLength,
      titleMaxLength: this.functionalConfig.titleMaxLengt,

      backdrop: this.functionalConfig.backdrop,
      position: this.snotifireForm.getRawValue().position,
      timeout: this.functionalConfig.timeout,
      showProgressBar: this.visualConfig.isShowProgressBar,
      closeOnClick: this.visualConfig.isCloseOnClick,
      pauseOnHover: this.visualConfig.isPauseOnHover,
    };
  }

  onSuccess() {
    this.notificationService.success(
      this.toastData.body,
      this.toastData.title,
      this.getConfig()
    );
  }
  onInfo() {
    this.notificationService.info(
      this.toastData.body,
      this.toastData.title,
      this.getConfig()
    );
  }
  onError() {
    this.notificationService.error(
      this.toastData.body,
      this.toastData.title,
      this.getConfig()
    );
  }
  onWarning() {
    this.notificationService.warning(
      this.toastData.body,
      this.toastData.title,
      this.getConfig()
    );
  }

  onHtml() {
    const html = `<div class="snotifyToast__title"><b>Html Bold Title</b></div>
    <div class="snotifyToast__body"><i>Html</i> <b>toast</b> <u>content</u></div>`;
    this.notificationService.html(html, this.getConfig());
  }

  onClear() {
    this.notificationService.clear();
  }

  private get functionalConfig(): FunctionalConfig {
    return this.snotifireForm.getRawValue().toastFunctionalConfig;
  }

  private get visualConfig(): VisualConfig {
    return this.snotifireForm.getRawValue().toastVisualConfig;
  }
  private get toastData(): ToastData {
    return this.snotifireForm.getRawValue().toastData;
  }

  private get notificationConfig(): NotificationConfig {
    return this.snotifireForm.getRawValue().notificationConf;
  }

  private getSvg(svg: string): string {
    return `assets/${svg}.svg`;
  }
}

export interface NotificationFormValue {
  position: NotificationPositionType;
  toastData: ToastData;
}
interface ToastData {
  title: string;
  body: string;
}
interface FunctionalConfig {
  titleMaxLengt: number;
  boydMaxLength: number;
  timeout: number;
  backdrop: number;
}
interface NotificationConfig {
  maxOnScreen: number;
  maxAtPosition: number;
}

interface VisualConfig {
  isShowProgressBar: boolean;
  isCloseOnClick: boolean;
  isPauseOnHover: boolean;
  isNewItemsOnTop: boolean;
  isFilterDuplicates: boolean;
}
