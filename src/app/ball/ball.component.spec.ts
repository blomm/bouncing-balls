import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallComponent } from './ball.component';

describe('BallComponent', () => {
  let component: BallComponent;
  let fixture: ComponentFixture<BallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallComponent);
    component = fixture.componentInstance;
    component.ball = {
      id: 1,
      x: '123',
      y: '456',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
