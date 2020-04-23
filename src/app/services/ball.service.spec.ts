import { TestBed } from '@angular/core/testing';

import { BallService } from './ball.service';

describe('BallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BallService = TestBed.get(BallService);
    expect(service).toBeTruthy();
  });

  it('should trigger subscriptions when ball added or removed', () => {
    const service: BallService = TestBed.get(BallService);
    const functions = {
      respFunc: () => {},
    };

    spyOnAllFunctions(functions);

    service.obs.subscribe(() => {
      functions.respFunc();
    });

    service.addBall({ x: 123, y: 123 });
    service.removeBall(1);

    expect(functions.respFunc).toHaveBeenCalledTimes(2);
  });
});
