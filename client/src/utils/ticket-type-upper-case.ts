export default function ticketTypeUpperCase(ticketType: string) {
  return ticketType?.replace("_", " ")?.toUpperCase();
}
