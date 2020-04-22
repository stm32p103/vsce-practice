import { Component, Injectable, OnInit, OnDestroy } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable, Subject, Subscription } from 'rxjs';

interface VsCodeApi {
  postMessage(message: any): void;
  getState(): any;
  setState(state: any);
}

declare function acquireVsCodeApi(): VsCodeApi;

@Injectable()
export class VsCodeService {
  private api: VsCodeApi;
  private messageSubject = new Subject<any>();

  constructor(private eventManager: EventManager) {
    this.api = acquireVsCodeApi();
    this.eventManager.addGlobalEventListener('window', 'message', (msg:any)=>{ this.messageSubject.next(msg.data)} );
  }

  getState(): any {
    return this.api.getState();
  }

  setState(state: any) {
    this.api.setState(state);
  }

  get message$(): Observable<any> {
    return this.messageSubject;
  }

  post(message: any) {
    this.api.postMessage(message);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'extview';
  private messageSubscription: Subscription;
  constructor(private vscode: VsCodeService) {
  }

  ngOnInit() {
    this.messageSubscription = this.vscode.message$.subscribe( msg => {
      this.title = JSON.stringify( msg );
    } );
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe;
  }

  postMessage() {
    this.vscode.post( { title: this.title } );
  }
}
