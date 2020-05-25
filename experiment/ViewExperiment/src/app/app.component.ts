import { Component, ViewContainerRef, ElementRef, Host } from '@angular/core';
import * as PIXI from 'pixi.js';
import { createScreen, Screen, Picture, Drawable, PixiDrawable } from './graphic';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private view: ViewContainerRef ) {
    const screen = createScreen();
    this.view.element.nativeElement.appendChild(screen.view);

    const p1 = screen.create('hello');
    const p2 = screen.create('bye');
    const d = new PixiDrawable();
    p1.draw(d);
    p1.position(100,100);
    p2.draw(d);

    let t = 0;
    screen.onTick( () => {
      p1.rotate(0.1);
      
      t+=0.1;
      if(t>Math.PI) {
        t=-Math.PI;
      }

      p2.position(400+100*Math.cos(t*2+0.2),300+100*Math.sin(t));
    } );
  }
}
