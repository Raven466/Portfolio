import {Component, signal} from '@angular/core';
import {RoomConfigModel, SideInter} from './models/room-config.model';
import {About} from './rooms/about/about';
import {Contact} from './rooms/contact/contact';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [About, Contact, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  rooms: RoomConfigModel[];
  maxRooms = 2;
  roomSelected: number | undefined;

  side: {
    up: SideInter,
    down: SideInter,
    left: SideInter,
    right: SideInter
  };

  protected readonly title = signal('Portfolio');

  constructor() {
    this.rooms = new Array<RoomConfigModel>();
    this.roomSelected = 0;
    this.side = {
      up: {button: false, targetId: 0},
      down: {button: false, targetId: 0},
      left: {button: false, targetId: 0},
      right: {button: false, targetId: 0}
    };
  }

  roomLoaded(config: RoomConfigModel): void {
    if (this.getRoom(config.id)) {
      return;
    }
    this.rooms.push(config);
    if (!this.roomSelected) {
      this.changeRoom(config.id);
    }
    console.log("room ", config.id, "(", config.txId,") load - style: ", this.getStyle(config.id));
    console.log("rooms loaded: ", this.rooms.length);
  }

  changeRoom(id: number | undefined): void {
    this.roomSelected = id;
    let newRoom = this.getRoom(id);
    if (!!newRoom) {
      let posX = newRoom.center.x - newRoom.size.x / 2;
      let posY = newRoom.center.y - newRoom.size.y / 2;
      globalThis.window.scroll({
        left: posX,
        top: posY,
        behavior: 'smooth'
      });
      console.log("scroll to ", posX, ", ", posY, " - room: ", newRoom.txId);

      this.loadConfigRoom(newRoom);
    }
  }

  loadConfigRoom(room: RoomConfigModel): void {
    this.side.up.button = room.side.up.button;
    this.side.up.targetId = room.side.up.targetId;
    this.side.down.button = room.side.down.button;
    this.side.down.targetId = room.side.down.targetId;
    this.side.left.button = room.side.left.button;
    this.side.left.targetId = room.side.left.targetId;
    this.side.right.button = room.side.right.button;
    this.side.right.targetId = room.side.right.targetId;
  }

  windowLoaded(): boolean {
    return !!globalThis.window?.scroll;
  }

  getRoom(id: number | undefined): RoomConfigModel | undefined {
    return this.rooms.find(x => x.id === id);
  }

  // getPosition(id: number): string {
  //   let room = this.getRoom(1);
  //   if (!room) {
  //     return '0px, 0px';
  //   }
  //   let posX = room.center.x - room.size.x / 2;
  //   let posY = room.center.y - room.size.y / 2;
  //   return posX + 'px, ' + posY + 'px';
  // }

  getStyle(id: number): object {
    let room = this.getRoom(1);
    if (!room) {
      console.log("Error style room: ", id);
      return {};
    }
    let posX = room.center.x - room.size.x / 2;
    let posY = room.center.y - room.size.y / 2;

    return {
      position: 'absolute',
      top: posX+'px',
      left: posY+'px',
      width: room.size.x,
      height: room.size.y
    };
  }

  existsRoom(id: number): boolean {
    return !!this.getRoom(id);
  }
}
