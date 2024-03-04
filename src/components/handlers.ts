export function generateID(): string {
  return (Math.random() + 1).toString(36).substring(6);
}