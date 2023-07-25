import { PrismaClient } from "@prisma/client";
import { Player } from "./player.model";
import { addHours } from "../utils/addHours";

class PlayerService {
  private static prisma = new PrismaClient();

  /**
   * Create a player based on that data
   * @returns an object that contains the player ID
   */
  public static async createPlayer(player: Player) {
    const { statements, ...playerDefault } = player;
    const existingPlayer = await this.prisma.player.findFirst({
      where: {
        playerName: player.playerName,
      },
    });
    const playerInfo = await this.prisma.player.create({
      data: {
        ...playerDefault,
        roomId: null,
        expiresAt: addHours(4, new Date()),
      },
    });

    if (existingPlayer) {
      return { errors: [{ msg: "Player already exists!" }] };
    }

    return { player: playerInfo };
  }
  //   public static async getAllRooms() {
  //     const res = await this.prisma.room.findMany();
  //     await this.prisma.$disconnect();
  //     return res;
  //   }
  public static async getPlayer(name: string) {
    const res = await this.prisma.player.findFirst({
      where: {
        playerName: name,
      },
    });
    if (!res) {
      return { errors: [{ msg: "Player doesn't exist!" }] };
    }
    await this.prisma.$disconnect();
    return { ...res };
  }
  // public static async deletePlayer(id: string) {
  //   const res = await this.prisma.player.delete({ where: { id: id } });
  //   await this.prisma.$disconnect();
  //   return res;
  // }
}

export default PlayerService;
