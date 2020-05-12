import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { VsCodeService } from './services'
import { Subscription } from 'rxjs';

import { HelloViewComponent, SamplesViewComponent } from './views';
const map = {
  'samples': SamplesViewComponent,
  'hello': HelloViewComponent
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

  ngOnDestroy() {
    this.subscripton.unsubscribe();
  }
  
  ngOnInit() {
    this.message = 'initialized.';
    this.subscripton = this.api.message$.subscribe( msg => {
      const target = map[msg];
      if( target ) {
        this.view = target;
      }
      this.message = msg;
    } );
    this.api.post('Webview is ready.');
  }
}