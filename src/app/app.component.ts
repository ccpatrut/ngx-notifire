import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NotificationService } from 'ngx-notifire';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  style = 'material';
  subj = new BehaviorSubject<string>('hello2');
  constructor(readonly notificationService: NotificationService) {}
  ngOnInit(): void {
    this.notificationService.emitter.subscribe((s) => console.log(s));
  }

  onSuccess() {
    this.notificationService.success('hi', 'we do it here ');
  }
}
