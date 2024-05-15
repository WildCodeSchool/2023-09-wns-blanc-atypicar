export const formatHour = (date: string) => {
  let dateObj = new Date(date);
  return dateObj.toLocaleTimeString("fr-FR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const calculateDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInSeconds = (end.getTime() - start.getTime()) / 1000;
  const hours = Math.floor(differenceInSeconds / 3600);
  const minutes = Math.floor((differenceInSeconds % 3600) / 60);
  return `${formatTime(hours)}h${formatTime(minutes)}`;
};

const formatTime = (time: number) => time.toString().padStart(2, "0");

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", options);
};

export const formattedDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const newDate = date.toLocaleDateString("fr-FR", options);

  return newDate;
};

export function formatStringToDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}T${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return formattedDate;
}
