import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {RoomConfigModel} from '../../models/room-config.model';

@Component({
  selector: 'room-contact',
  imports: [],
  templateUrl: './contact.html'
})
export class Contact implements AfterViewInit {
  @Output() eventRoom = new EventEmitter<RoomConfigModel>();
  configRoom: RoomConfigModel;

  constructor() {

    this.configRoom = {
      id: 2,
      txId: 'roomContact',
      center: {x: 1200, y: 850},
      size: {x: 1600, y: 1200},
      side: {
        up: {button: true, targetId: 1},
        down: {button: false, targetId: 0},
        left: {button: true, targetId: 1},
        right: {button: false, targetId: 0},
      }
    };
  }

  ngAfterViewInit() {
    this.eventRoom.emit(this.configRoom);
  }}
