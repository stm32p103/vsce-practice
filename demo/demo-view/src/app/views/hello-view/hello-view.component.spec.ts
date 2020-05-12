import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloViewComponent } from './hello-view.component';

describe('HelloViewComponent', () => {
  let component: HelloViewComponent;
  let fixture: ComponentFixture<HelloViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
