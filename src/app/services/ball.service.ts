import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ball } from '../models/Ball';

@Injectable({
  providedIn: 'root',
})
export class BallService {
  // create a subject and observable to be subscribed to in order
  // to receive changes to ball array/collection
  private subject = new Subject<Ball[]>();
  obs = this.subject.asObservable();
  private activeBalls: Ball[] = [];
  ballId = 1;

  // ball has finished bouncing
  removeBall(id) {
    const index = this.activeBalls.findIndex((b) => b.id === id);
    this.activeBalls.splice(index, 1);
    this.subject.next(this.activeBalls);
  }

  // user has clicked on screen
  addBall(event) {
    // give the ball an id so we can remove it later
    const ball: Ball = {
      id: this.ballId,
      x: event.x,
      y: event.y,
    };
    this.ballId++;

    this.activeBalls.push(ball);
    this.subject.next(this.activeBalls);
  }
}
