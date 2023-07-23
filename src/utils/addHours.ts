
export function addHours(hours: any, date = new Date()) {
  if (typeof hours !== 'number') throw new Error("Invalid \"hours\" argument");
  if (!(date instanceof Date)) throw new Error("Invalid \"date\" argument")
  date.setHours(date.getHours() + 4)

  return date
}