import { Room } from "./room.model";
import { PrismaClient } from "@prisma/client";

class RoomService {
  private static prisma = new PrismaClient();

  public static async createRoom(room: Room) {
    const roomDefault = {
      ...room,
      createdAt: new Date()
    }

    const res = await this.prisma.room.create({ data: roomDefault });
    await this.prisma.$disconnect();
    return res;
  }

  public static async getAllRooms() {
    const res = await this.prisma.room.findMany();
    await this.prisma.$disconnect();
    return res
  }

  public static async deleteRoom(id: string) {
    const res = await this.prisma.room.delete({where: {roomId: id}});
    return res
  }
}

export default RoomService;
