import { Room } from "../models/room.model";

class RoomService {
  private static readonly rooms: Room[] = [];


  public static createRoom(room: Room) {
    this.rooms.push(room);
  }

  public static async getAllRooms(): Promise<Room[]> {
    return this.rooms;
  }
}

export default RoomService;
