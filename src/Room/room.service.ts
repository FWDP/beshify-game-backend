import { Room } from "./room.model";
import { PrismaClient } from "@prisma/client";

class RoomService {
  private static prisma = new PrismaClient();

  public static async createRoom(room: Room) {
    const res = await this.prisma.room.create({ data: room });
    return res;
  }

  public static async getAllRooms() {
    return await this.prisma.room.findMany();
  }
}

export default RoomService;
