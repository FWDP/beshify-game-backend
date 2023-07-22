export const VoteSchema = {
  statementId: {
    errorMessage: "There should be a statement!",
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  reaction: {
    errorMessage: "There should be a valid reaction!",
    isLength: {
      options: {
        min: 1,
      },
    },
    isIn: {
      options: [["🤸", "✨", "❌"]],
    },
  },
};
