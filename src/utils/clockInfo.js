export default function getClockInfo() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const day = days[currentDate.getDay()];
    const date = currentDate.getDate();
    const time = currentDate.toLocaleTimeString();
    return { day, date, time };
  }
  