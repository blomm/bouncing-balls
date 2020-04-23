import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ball } from '../models/Ball';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit {
  @Input() ball: Ball;
  @Output() ballFinishedBouncing: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Random number generation for velocity and angle:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    let v = Math.floor(Math.random() * 50) + 25;
    // angle needs to be in radians
    const angle = (Math.floor(Math.random() * Math.floor(180)) * Math.PI) / 180;

    let t = 0;
    const ballSize = 20;
    const g = 9.8;
    let originX = this.ball.x;
    let originY = this.ball.y;
    let moving = true;

    // initial positioning
    this.el.nativeElement.style.left = parseInt(originX) + 'px';
    this.el.nativeElement.style.top = parseInt(originY) + 'px';

    // TODO: watch for frameHeight resizing
    const frameHeight = this.el.nativeElement.parentNode.clientHeight;

    // https://en.wikipedia.org/wiki/Projectile_motion
    // x = v * t * cos(angle);
    // y = v * t * sin(angle) - 1/2*g*t^2

    // sections of https://physics.stackexchange.com/questions/256468/model-formula-for-bouncing-ball
    // used in the code below
    let heightOfBall = frameHeight - parseInt(originY);
    let hMax = heightOfBall;
    let vMax = 0;
    const hStop = 1;
    const interval = setInterval(() => {
      if (moving) {
        if (heightOfBall < 0) {
          moving = false;
          // when we start a bounce we reset the time
          t = 0;
          vMax = Math.sqrt(2 * hMax * g);
          // if the ball has just bounced less than a pixel, end
          if (hMax <= hStop) {
            // remove the ball from our balls array
            this.ballFinishedBouncing.emit(this.ball.id);
            clearInterval(interval);
          }
        } else {
          // our x displacement from the origin
          const x = v * t * Math.cos(angle);
          // our y displacement from the origin
          const y = v * t * Math.sin(angle) - 0.5 * g * Math.pow(t, 2);

          this.el.nativeElement.style.left = parseInt(originX) + x + 'px';
          this.el.nativeElement.style.top = parseInt(originY) - y + 'px';
          heightOfBall = frameHeight - ballSize - parseInt(this.el.nativeElement.style.top);
          // find and store the highest point on this bounce
          hMax = heightOfBall > hMax ? heightOfBall : hMax;
          // time increments at 2 milliseconds, the same time
          // as our setInterval
          t += 0.002;
        }
      } else {
        vMax = vMax * 0.75; // 0.75 = 25% loss in velocity on the bounce
        // the starting velocity for the next bounce will be
        // 75% of velocity when ball hit ground, vector will
        // remain same as it was upon initial ball launch
        v = vMax;
        moving = true;
        // reset the ball height
        heightOfBall = 0;
        hMax = 0;
        // the y origin will be the bottom of the page plus
        // the height of the ball for any secondary bounces
        originY = frameHeight - ballSize + 'px';
        originX = this.el.nativeElement.style.left;
      }
    }, 2);
  }
}
