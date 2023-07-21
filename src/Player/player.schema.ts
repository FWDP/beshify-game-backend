export const userSchema = {
  playerName: {
    exists: {
      errorMessage: "Name should exist!",
    },
  },
  imageUrl: { optional: true },
};
