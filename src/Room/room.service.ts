import { Room } from "./room.model";
import { PrismaClient } from "@prisma/client";

class RoomService {
  private static prisma = new PrismaClient();

  public static async createRoom(room: Room) {
    const roomDefault = {
      ...room,
      createdAt: new Date(),
    };

    const existingRoom = await this.prisma.room.findFirst({
      where: {
        roomName: room.roomName,
      },
    });

    if (existingRoom) {
      return { errors: [{ msg: "Room already exists!" }] };
    }

    const res = await this.prisma.room.create({ data: roomDefault });
    await this.prisma.$disconnect();
    return { roomId: res.roomId };
  }

  public static async getAllRooms() {
    const res = await this.prisma.room.findMany();
    await this.prisma.$disconnect();
    return res;
  }
  public static async getRoom(name: string) {
    const res = await this.prisma.room.findMany({
      where: {
        roomName: {
          contains: name,
        },
      },
    });
    if (!res) {
      return { errors: [{ msg: "Room doesn't exists!" }] };
    }
    await this.prisma.$disconnect();
    return res;
  }
  public static async deleteRoom(id: string) {
    const res = await this.prisma.room.delete({ where: { roomId: id } });
    await this.prisma.$disconnect();
    return res;
  }
}

export default RoomService;
