import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesViewComponent } from './samples-view.component';

describe('SamplesViewComponent', () => {
  let component: SamplesViewComponent;
  let fixture: ComponentFixture<SamplesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
