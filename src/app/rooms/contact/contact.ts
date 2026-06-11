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
      center: {x: 300, y: 600},
      size: {x: 250, y: 250},
      side: {
        up: {button: true, targetId: 1},
        down: {button: false, targetId: 0},
        left: {button: false, targetId: 0},
        right: {button: false, targetId: 0},
      }
    };
  }

  ngAfterViewInit() {
    this.eventRoom.emit(this.configRoom);
  }}
