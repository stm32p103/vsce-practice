import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { VsCodeService } from './services'
import { Subscription } from 'rxjs';

import { HelloViewComponent, SamplesViewComponent, EditorViewComponent } from './views';
const map = {
  'samples': SamplesViewComponent,
  'hello': HelloViewComponent,
  'editor': EditorViewComponent
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  subscripton: Subscription;
  message: string;
  view: Type<any>;
  constructor( private api: VsCodeService ) {
  }

  reopen() {
    this.api.post({type:'demo.reopen'});
  }
  
  hello() {
    this.api.post({type:'demo.hello'});
  }

  ngOnDestroy() {
    this.subscripton.unsubscribe();
  }
  
  ngOnInit() {
    this.message = '';
    this.subscripton = this.api.message$.subscribe( msg => {
      switch(msg.type) {
      case 'demo.goto':
        const target = map[msg.data.id];
        if( target ) {
          this.view = target;
        }
        break;
      }
    } );
  }
}