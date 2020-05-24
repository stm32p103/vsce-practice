import { Disposable } from "vscode";  
export interface Message {
    type: string;
    data?: any;
}

export class DemoDispatcher {
    private handlers: {[type:string]: (msg:Message)=>void} = {};

    register(type: string, handler: (msg:Message)=>void) {
        this.handlers[type] = handler;
    }

    unregister(type: string) {
        delete this.handlers[type];
    }

    dispatch(msg: Message) {
        const handler = this.handlers[msg.type];
        if(handler) {
            handler(msg);
        }
    }
}
