import { TestBed } from '@angular/core/testing';

import { NgxNotifireService } from './ngx-notifire.service';

describe('NgxNotifireService', () => {
  let service: NgxNotifireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotifireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
