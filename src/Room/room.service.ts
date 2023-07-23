import { addHours } from "../utils/addHours";
import { Room } from "./room.model";
import { PrismaClient } from "@prisma/client";

class RoomService {
  private static prisma = new PrismaClient();
  public static readonly chatRooms: String[] = [];

  private static async getRoomsInfo(
    rooms: any[],
  ): Promise<{ roomName: string; playerNumber: number }[]> {
    let data = [];
    for (const room of rooms) {
      const players = await this.prisma.player.findMany({
        where: {
          roomId: room.id,
        },
      });
      data.push({
        roomName: room.roomName,
        playerNumber: players.length,
      });
      await this.prisma.$disconnect();
    }
    return data;
  }

  /**
   * Create a room by a given data
   * @returns an object that contains the ID of that created room
   */
  public static async createRoom(room: Room) {
    const roomDefault = {
      ...room,
      expiresAt: addHours(4, new Date()),
    };
    const existingRoom = await this.prisma.room.findFirst({
      where: {
        roomName: room.roomName,
      },
    });

    if (existingRoom) {
      return { errors: [{ msg: "Room already exists!" }] };
    }

    const hostData = await this.prisma.player.findFirst({
      where: {
        playerName: room.hostName,
      },
    });

    if (!hostData) {
      return { errors: [{ msg: "Player does not exist" }] };
    }

    if (hostData.roomId) {
      return { errors: [{ msg: "You are already in another room" }] };
    }

    // try to create a room that also modifies the host to have that room id
    try {
      const createdRoom = await this.prisma.room.create({
        data: {
          ...roomDefault,
          players: {
            connect: [
              {
                id: hostData.id,
              },
            ],
          },
        },
        include: {
          players: true,
        },
      });
      await this.prisma.$disconnect();
      this.chatRooms.push(createdRoom.id);
      // return the id
      return { roomId: createdRoom.id };
    } catch (error) {
      return { errors: [{ msg: "Failed to create the room" }] };
    }
  }

  /**
   * Get all rooms
   * @returns an array of room name and their number of players
   */
  public static async getAllRooms() {
    const rooms = await this.prisma.room.findMany();
    const res = await this.getRoomsInfo(rooms);
    await this.prisma.$disconnect();
    return res;
  }

  /**
   * Get room by name
   * @returns an array of player name and their statements
   */
  public static async getRoom(name: string) {
    const room = await this.prisma.room.findFirst({
      where: { roomName: name },
      include: {
        players: {
          include: {
            statements: true,
          },
        },
      },
    });

    if (!room) {
      return { errors: [{ msg: "Room not found" }] };
    }

    const data = room.players.map((player) => {
      return {
        playerName: player.playerName,
        statements: player.statements.map((statement) => statement.text),
      };
    });

    await this.prisma.$disconnect();
    return data;
  }

  /**
   * Join a room by the given user data
   * @returns an array of player name and their statements
   */
  public static async joinRoom(data: {
    playerName: string;
    roomName: string;
    password: string;
  }) {
    const room = await this.prisma.room.findFirst({
      where: {
        roomName: data.roomName,
      },
      include: {
        players: true,
      },
    });

    if (!room) {
      return { errors: [{ msg: "Room not found" }] };
    }
    if (room.password != data.password) {
      return { errors: [{ msg: "Password incorrect" }] };
    }
    const players = await this.prisma.player.findMany({
      where: {
        roomId: room.id,
      },
      orderBy: {
        playerName: "asc",
      },
    });
    if (players.length >= room.roomSize) {
      return { errors: [{ msg: "The room is already full" }] };
    }
    const user = await this.prisma.player.findFirst({
      where: {
        playerName: data.playerName,
      },
    });

    if (!user) {
      return { errors: [{ msg: "User not found" }] };
    }

    if (user.roomId) {
      return { errors: [{ msg: "You are already in another room" }] };
    }

    try {
      const updatedUser = await this.prisma.player.update({
        where: {
          id: user.id,
        },
        data: {
          roomId: room.id,
        },
      });

      return { ...room, players: [...players, updatedUser] };
    } catch (error) {
      return { errors: [{ msg: "Failed to join the room" }] };
    }
  }

  /**
   * Delete room by ID
   * @returns a deleted room
   */
  public static async deleteRoom(id: string) {
    const res = await this.prisma.room.delete({ where: { id: id } });
    const roomToDelete = this.chatRooms.indexOf(id);
    if (roomToDelete !== -1) this.chatRooms.splice(roomToDelete, 1);
    await this.prisma.$disconnect();
    return res;
  }

  public static async repopulateChatRooms(){
    const chatRoomBackup = this.chatRooms;
    this.chatRooms.splice(0, this.chatRooms.length);
    try{
      const res = await this.prisma.room.findMany({select:{ id:true }});
      res.map(data => {
        console.log(data.id)
        this.chatRooms.push(data.id)
      })
      
      return { repopulated: this.chatRooms }
    }
    catch(err){
      this.chatRooms.concat(chatRoomBackup)
      return err
    }
  }

  public static async getChatRooms() {
    return this.chatRooms;
  }
}

export default RoomService;
