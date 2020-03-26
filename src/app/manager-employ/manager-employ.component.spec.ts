import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmployComponent } from './manager-employ.component';

describe('ManagerEmployComponent', () => {
  let component: ManagerEmployComponent;
  let fixture: ComponentFixture<ManagerEmployComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerEmployComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEmployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
