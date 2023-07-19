export const roomSchema = {
  roomName: {
    errorMessage:
      "The room name should be more than 2 OR less than 8 characters!",
    isLength: {
      options: {
        min: 2,
        max: 8,
      },
    },
  },
  password: {
    errorMessage: "The password should ONLY have 4 characters!",
    isLength: {
      options: {
        min: 4,
        max: 4,
      },
    },
  },
  roomSize: {
    errorMessage: "The room size should be a number that does NOT EXCEED 10!",
    isInt: {
      options: {
        min: 1,
        max: 10,
      },
    },
  },

  timeLimit: {
    errorMessage:
      "The time limit should be a number that does NOT EXCEED 360 seconds (or 5 minutes)!",
    isInt: {
      options: {
        min: 1,
        max: 10,
      },
    },
  },
};
