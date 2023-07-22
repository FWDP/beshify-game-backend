import { PrismaClient } from "@prisma/client";
import { Player } from "./player.model";

class PlayerService {
  private static prisma = new PrismaClient();

  /**
   * Create a player based on that data
   * @returns an object that contains the player ID
   */
  public static async createPlayer(player: Player) {
    const { statements, ...playerDefault } = player;
    const playerInfo = await this.prisma.player.create({
      data: {
        ...playerDefault,
        roomId: null,
        createdAt: new Date(),
      },
    });

    if (statements && statements.length > 0) {
      try {
        const statementObjects = statements.map((statementText) => ({
          text: statementText,
          votes: 0,
          playerId: playerInfo.id,
        }));

        await this.prisma.statement.createMany({
          data: statementObjects,
        });

        const playerWithStatements = await this.prisma.player.findUnique({
          where: {
            id: playerInfo.id,
          },
          include: {
            statements: true,
          },
        });

        return { player: playerWithStatements };
      } catch (error) {
        return { errors: [{ msg: "Failed to create player with statements" }] };
      }
    }

    return { player: playerInfo };
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
