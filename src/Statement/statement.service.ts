import { PrismaClient } from "@prisma/client";
import { addHours } from "../utils/addHours";

class StatementService {
  private static prisma = new PrismaClient();
  public static async createStatement({
    playerName,
    text,
  }: {
    playerName: string;
    text: string;
  }) {
    try {
      const player = await this.prisma.player.findFirst({
        where: {
          playerName: playerName,
        },
      });

      if (!player) {
        return { errors: [{ msg: "Player not found" }] };
      }

      if (!player.roomId) {
        return { errors: [{ msg: "You are not in a room" }] };
      }

      const statement = await this.prisma.statement.create({
        data: {
          text: text,
          votes: 0,
          expiresAt: addHours(4, new Date()) ,
          player: {
            connect: {
              id: player.id,
            },
          },
        },
      });

      return { statement: statement };
    } catch (error) {
      return { errors: [{ msg: "Failed to create statement" }] };
    }
  }
}

export default StatementService;
