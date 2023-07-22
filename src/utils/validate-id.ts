import { BSON } from "bson";

function isValidObjectId(id: string) {
  if (!id) return false;
  try {
    const parsedId = new BSON.ObjectId(id);
    // Check if the ID was successfully parsed and if it matches the original ID string
    return parsedId.toString() === id;
  } catch (error) {
    return false;
  }
}

export default isValidObjectId;
