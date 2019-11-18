import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedoutPageComponent } from './loggedout-page.component';

describe('LoggedoutPageComponent', () => {
  let component: LoggedoutPageComponent;
  let fixture: ComponentFixture<LoggedoutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedoutPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
