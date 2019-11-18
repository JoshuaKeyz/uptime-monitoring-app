import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCheckPageComponent } from './edit-check-page.component';

describe('EditCheckPageComponent', () => {
  let component: EditCheckPageComponent;
  let fixture: ComponentFixture<EditCheckPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCheckPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCheckPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
