import { Injectable } from '@angular/core';
// import { Http, HttpModule } from '@angular/http';


@Injectable()
export class MessageService {
  messages: string[] = [];

  constructor() {
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}
