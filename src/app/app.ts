import {Component, signal} from '@angular/core';
import {RoomConfigModel, SideInter} from './models/room-config.model';
import {About} from './rooms/about/about';
import {Contact} from './rooms/contact/contact';

@Component({
  selector: 'app-root',
  imports: [About, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  rooms: RoomConfigModel[];
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

  roomCargada(config: RoomConfigModel): void {
    this.rooms.push(config);
    if (!this.roomSelected) {
      this.changeRoom(config.id);
    }
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

  existsRoom(id: number): boolean {
    return !!this.getRoom(id);
  }
}
