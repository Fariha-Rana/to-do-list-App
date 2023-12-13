"use client";
import getClockInfo from "@/utils/clockInfo";
import { useEffect, useState} from "react";

export default function CurrentDate() {
  const [time, setTime] = useState(getClockInfo().time);
  const [day, setDay] = useState(getClockInfo().day);
  const [date, setDate] = useState(getClockInfo().date);

  useEffect(() => {
     setInterval(() => {
    setTime(getClockInfo().time);
    setDay(getClockInfo().day);
    setDate(getClockInfo().date);
  }, 1000);
   })


  return (
    <>
    <div className="text-md text-end font-russo">
      {day} {date}
    </div>
    <div className="font-russo text-4xl">{time}</div>
  </>
  )
}
