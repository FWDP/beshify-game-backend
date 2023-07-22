export const statementSchema = {
  text: {
    errorMessage: "There should be a statement!",
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  playerName: {
    isLength: {
      options: {
        min: 1,
      },
    },
  },
};
