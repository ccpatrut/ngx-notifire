import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifireComponent } from './ngx-notifire.component';

describe('NgxNotifireComponent', () => {
  let component: NgxNotifireComponent;
  let fixture: ComponentFixture<NgxNotifireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxNotifireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotifireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
