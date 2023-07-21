export const userSchema = {
  playerName: {
    exists: {
      errorMessage: "Name should exists!",
    },
  },
  imageUrl: { optional: true },
};
