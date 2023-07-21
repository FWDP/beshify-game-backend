import { PrismaClient } from "@prisma/client";
import { Player } from "./player.model";

class PlayerService {
  private static prisma = new PrismaClient();

  /**
   * Create a player based on that data
   * @returns an object that contains the player ID
   */
  public static async createPlayer(player: Player) {
    const playerDefault = {
      ...player,
      roomId: null,
      statement: null,
      createdAt: new Date(),
    };

    const existingPlayer = await this.prisma.player.findFirst({
      where: {
        playerName: player.playerName,
      },
    });

    if (existingPlayer) {
      return { errors: [{ msg: "Player already exists!" }] };
    }

    const res = await this.prisma.player.create({ data: playerDefault });
    await this.prisma.$disconnect();
    return { playerId: res.id };
  }

  //   public static async getAllRooms() {
  //     const res = await this.prisma.room.findMany();
  //     await this.prisma.$disconnect();
  //     return res;
  //   }
  //   public static async getRoom(name: string) {
  //     const res = await this.prisma.room.findMany({
  //       where: {
  //         roomName: {
  //           contains: name,
  //         },
  //       },
  //     });
  //     if (!res) {
  //       return { errors: [{ msg: "Room doesn't exists!" }] };
  //     }
  //     await this.prisma.$disconnect();
  //     return res;
  //   }
  // public static async deletePlayer(id: string) {
  //   const res = await this.prisma.player.delete({ where: { id: id } });
  //   await this.prisma.$disconnect();
  //   return res;
  // }
}

export default PlayerService;
