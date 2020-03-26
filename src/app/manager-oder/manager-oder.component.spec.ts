import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOderComponent } from './manager-oder.component';

describe('ManagerOderComponent', () => {
  let component: ManagerOderComponent;
  let fixture: ComponentFixture<ManagerOderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerOderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerOderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
