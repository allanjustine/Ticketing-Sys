import { formatDate, formatDistanceToNowStrict } from "date-fns";

export default function formattedDateAndTimeStrict(date: Date | undefined) {
  if (!date) return "";
  return `${formatDate(
    new Date(date),
    "MMMM dd, yyyy HH:mm a"
  )} | ${formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  })}`;
}
