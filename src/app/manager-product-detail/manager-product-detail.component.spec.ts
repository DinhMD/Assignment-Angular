import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProductDetailComponent } from './manager-product-detail.component';

describe('ManagerProductDetailComponent', () => {
  let component: ManagerProductDetailComponent;
  let fixture: ComponentFixture<ManagerProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
