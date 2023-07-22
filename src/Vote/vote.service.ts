import { PrismaClient } from "@prisma/client";
import isValidObjectId from "../utils/validate-id";

class VoteService {
  private static prisma = new PrismaClient();
  public static async createVote({
    statementId,
    reaction,
  }: {
    statementId: string;
    reaction: "🤸" | "✨" | "❌";
  }) {
    if (!isValidObjectId(statementId)) {
      return { errors: [{ msg: "Not a valid statement ID" }] };
    }
    const statement = await this.prisma.statement.findUnique({
      where: {
        id: statementId,
      },
    });
    if (!statement) {
      return { errors: [{ msg: "No statement found" }] };
    }
    // map each corresponding reaction
    const correspondingReaction = {
      "🤸": 2,
      "✨": 1,
      "❌": -1,
    };
    // update the statement
    await this.prisma.statement.update({
      where: {
        id: statement.id,
      },
      data: {
        votes: statement.votes + correspondingReaction[reaction],
      },
    });
    return { status: "OK" };
  }
}
export default VoteService;
