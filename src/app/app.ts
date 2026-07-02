import {Component, HostListener, signal} from '@angular/core';
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

  winSize = {x: 0, y: 0};
  mapScale = 1;


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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    let room = this.getRoom(this.roomSelected);
    this.moveToRoom(room);
  }

  roomLoaded(config: RoomConfigModel): void {
    if (this.getRoom(config.id)) {
      return;
    }
    this.rooms.push(config);

    let change = false;
    if (config.center.x + config.size.x > this.winSize.x) {
      this.winSize.x = config.center.x + config.size.x + 2000; // window.innerWidth;
      change = true;
    }
    if (config.center.y + config.size.y > this.winSize.y) {
      this.winSize.y = config.center.y + config.size.y + 2000; // + window.innerHeight;
      change = true;
    }
    if (change) {
      console.log("map resized: {", this.winSize.x, ", ", this.winSize.y, "}");
    }

    if (!this.roomSelected && this.rooms.length == this.maxRooms) {
      this.changeRoom(1);
    }
    console.log("room ", config.id, "(", config.txId, ") load - style: ", this.getStyle(config.id));
    console.log("rooms loaded: ", this.rooms.length);
  }

  changeRoom(id: number | undefined): void {
    this.roomSelected = id;
    let room = this.getRoom(id);
    if (!!room) {
      this.moveToRoom(room)
      this.loadConfigRoom(room);
    }
  }

  moveToRoom(room: RoomConfigModel | undefined): void {
    if (room && this.isWindow()) {
      const width = window.innerWidth;
      const height = window.innerHeight - 150; // header

      let scaleX = (width - 60) / room.size.x;
      let scaleY = (height - 60) / room.size.y;
      let scale = Math.min(scaleX, scaleY);
      this.mapScale = scale;
      // document.body.style.transform = "scale(" + scale + ")";
      console.log("scaleX ", scaleX, "(", width, "/", room.size.x, "), scaleY ", scaleY, "(", height, "/", room.size.y, "): ", scale);

      let posX = room.center.x - ((width - room.size.x) / 2) * scale;
      let posY = room.center.y - ((height - room.size.y) / 2) * scale;
      window.scroll(posX, posY);
      console.log("scroll to ", posX, ", ", posY, "(", 1, ") - room: ", room.txId);
    } else {
      console.log("window not found");
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

  getRoom(id: number | undefined): RoomConfigModel | undefined {
    return this.rooms.find(x => x.id === id);
  }

  getStyle(id: number): object {
    let room = this.getRoom(id);
    if (!room) {
      console.log("Error style room: ", id);
      return {};
    }
    let posX = room.center.x - room.size.x / 2;
    let posY = room.center.y - room.size.y / 2;

    return {
      position: 'absolute',
      top: posY + 'px',
      left: posX + 'px',
      width: room.size.x + 'px',
      height: room.size.y + 'px',
      'background-image': 'url(./media/room.jpg)',
      'background-size': 'contain',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'align-content': 'center'
    };
  }

  isWindow(): boolean {
    return typeof window !== 'undefined';
  }
}
