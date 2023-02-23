import {Injectable} from '@angular/core';
import {webSocketConfig} from "../constants/websocket.config";
import {webSocket} from "rxjs/webSocket";
import {Socket} from "ngx-socket-io";
import {IConnectRoom} from "../interfaces/room.interface";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subject = webSocket(webSocketConfig.url);

  constructor(private socket: Socket) {

  }

  private sendMessage(event: string, args: any) {
    this.socket.emit(event, args)
  }

  connectRoom(payload: IConnectRoom){
    this.sendMessage('connectRoom', payload);
  }

  getMessage() {
    return this.socket.fromEvent('msgToServer');
  }

  create(){

  }

}
