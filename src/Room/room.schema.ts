export const createRoomSchema = {
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
  hostName: {
    errorMessage: "There should be a host name",
    isLength: {
      options: {
        min: 1,
      },
    },
  },
  timeLimit: {
    errorMessage:
      "The time limit should be a number that does NOT EXCEED 360 seconds (or 5 minutes)!",
    isInt: {
      options: {
        min: 1,
        max: 360,
      },
    },
  },
};

export const joinRoomSchema = {
  playerName: {
    errorMessage: "There should be a player name",
    isLength: {
      options: {
        min: 1,
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
  roomName: {
    errorMessage: "There should be a room name",
    isLength: {
      options: {
        min: 1,
      },
    },
  },
};
