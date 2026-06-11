export interface RoomConfigModel {
  id: number;
  txId: string;
  center: {
    x: number,
    y: number
  };
  size: {
    x: number,
    y: number
  };
  side: {
    up: SideInter;
    down: SideInter;
    left: SideInter;
    right: SideInter;
  };
}

export interface SideInter {
  button: boolean;
  targetId: number | undefined;
}
