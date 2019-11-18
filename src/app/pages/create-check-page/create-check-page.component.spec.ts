import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCheckPageComponent } from './create-check-page.component';

describe('CreateCheckPageComponent', () => {
  let component: CreateCheckPageComponent;
  let fixture: ComponentFixture<CreateCheckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCheckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
