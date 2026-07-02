import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {RoomConfigModel} from '../../models/room-config.model';

@Component({
  selector: 'room-about',
  imports: [],
  templateUrl: './about.html'
})
export class About implements AfterViewInit {
  @Output() eventRoom = new EventEmitter<RoomConfigModel>();
  configRoom: RoomConfigModel;

  constructor() {

    this.configRoom = {
      id: 1,
      txId: 'roomAbout',
      center: {x: 6000, y: 2500},
      size: {x: 250, y: 250},
      side: {
        up: {button: false, targetId: 2},
        down: {button: true, targetId: 2},
        left: {button: false, targetId: 2},
        right: {button: true, targetId: 2},
      }
    };
  }

  ngAfterViewInit() {
    this.eventRoom.emit(this.configRoom);
  }
}
