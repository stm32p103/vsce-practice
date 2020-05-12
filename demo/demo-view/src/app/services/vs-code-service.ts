import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable, Subject, Subscription } from 'rxjs';

// https://github.com/microsoft/vscode-cpptools/blob/master/Extension/ui/settings.ts#L54-L60
interface VsCodeApi {
  postMessage(msg: {}): void;
  setState(state: {}): void;
  getState(): {};
}
declare function acquireVsCodeApi(): VsCodeApi;

@Injectable()
export class VsCodeService {
  private api: VsCodeApi;
  private messageSubject = new Subject<any>();

  constructor(private eventManager: EventManager) {
    if( acquireVsCodeApi ) {
      this.api = acquireVsCodeApi();
      this.eventManager.addGlobalEventListener('window', 'message', (msg:any)=>{ this.messageSubject.next(msg.data)});
    }
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
