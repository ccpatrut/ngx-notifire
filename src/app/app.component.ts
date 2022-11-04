import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throws } from 'assert';
import { NotificationService } from 'ngx-notifire';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  snotifyForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    readonly notificationService: NotificationService
  ) {
    this.snotifyForm = this.fb.group({
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
      notificationConf: this.fb.group({
        maxOnScreen: [6, [Validators.required]],
        maxAtPosition: [4, [Validators.required]],
      }),
      toastStyle: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  onSuccess() {}
}
