export const truncateStr = (str: string, length: number) => {
  if(!str) return str;
  return str.length > length ? str.substring(0, length) + "..." : str;
}
