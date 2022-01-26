import { Injectable } from '@angular/core';
import { Message } from '../models/message';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  url: string =  '/socket';

  private stompClient: any;
  initialized: boolean = false;

  constructor(private toastr: ToastrService) { }

  connect(userId: any): void {
    if(this.initialized) {
      return;
    }
    this.initialized = true;
 
    const socket = new SockJS("http://localhost:8080/socket/");
    this.stompClient = Stomp.over(socket);

    const that = this;
    this.stompClient.connect({}, function (frame: string) {
      that.initialized = true;
      console.log('Connected: ' + frame);

      that.stompClient.subscribe('/socket-publisher', function (message: {body: any}) {
        that.showMessage(message);
      });

      that.subscribeToLocalSocket(userId);
    });

    console.log(this.stompClient)
  }

  disconnect(): void {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.initialized = false;
    console.log('Disconnected!');
  }

  subscribeToLocalSocket(userId: any): void {
    this.stompClient.subscribe("/socket-publisher/" + userId, (message: { body: string; }) => {
      this.showMessage(message);
    });
  }
  
  sendMessage(message: any): void {
    this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(message));
  }

  showMessage(message: { body: any; }): void {
    let messageResult: Message = JSON.parse(message.body);
    this.toastr.success(messageResult.content, undefined, {
      'timeOut': 3000
    });
  
  }


}
