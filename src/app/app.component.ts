import { BallComponent } from './ball/ball.component';
import { BallService } from './services/ball.service';
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ballService: BallService, private el: ElementRef) {}

  ballsObs = this.ballService.obs;

  addBall(event) {
    this.ballService.addBall(event);
  }
  onBallFinishedBouncing(event) {
    this.ballService.removeBall(event);
  }
}
