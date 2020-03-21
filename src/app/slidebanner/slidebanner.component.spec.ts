import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidebannerComponent } from './slidebanner.component';

describe('SlidebannerComponent', () => {
  let component: SlidebannerComponent;
  let fixture: ComponentFixture<SlidebannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidebannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
