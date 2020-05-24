import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { VsCodeService } from '../../services'
import { createScreen, Screen, Picture, Drawable, LineDrawable } from '../../components';

// モデル。Extensionと共有すべきもの
interface Item {
  key: string;
  title: string;
  description: string;
  value: string;
}

interface Coordinate {
  x: number;
  y: number;
}

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements AfterViewInit {
  private subscripion;
  private screen;
  items: Item[] = [];
  coords: Coordinate[] = [];
  constructor(private api: VsCodeService, private view: ViewContainerRef ) {
    this.screen = createScreen();
    const picture = this.screen.create('sample');

    this.api.post( {type: 'editor.ready'} );
    this.subscripion = this.api.message$.subscribe( msg => {
      switch( msg.type ) {
      case 'updateAll':
        console.log('update');
        console.log(JSON.stringify(msg.data.coords));
        this.items = msg.data.items;
        this.coords = msg.data.coords;
        const polygon = new LineDrawable(this.coords);
        picture.draw(polygon);

        console.log(JSON.stringify(this.coords));
        break;
      }
    } );
  }

  ngAfterViewInit(): void {
    this.view.element.nativeElement.appendChild(this.screen.view);
  }
}
