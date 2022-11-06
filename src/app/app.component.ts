import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationPositionType, NotificationService } from 'ngx-notifire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  snotifireForm: FormGroup;
  positions: string[];
  themes = ['material', 'dark', 'simple'];

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

  onSuccess() {
    this.notificationService.success('hi', 'we do it here ');
  }

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

  private get toastData(): ToastData {
    return this.snotifireForm.getRawValue().toastData;
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
