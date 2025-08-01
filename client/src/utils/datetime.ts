export function dateTimeUtility(dateTimeString: string): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const monthAbbreviation = months[dateTime.getMonth()];
  const day = String(dateTime.getDate()).padStart(2, "0");

  return `${monthAbbreviation} ${day}, ${year}`;
}