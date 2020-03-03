import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseElementsComponent } from './base-elements.component';

describe('BaseElementsComponent', () => {
  let component: BaseElementsComponent;
  let fixture: ComponentFixture<BaseElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
