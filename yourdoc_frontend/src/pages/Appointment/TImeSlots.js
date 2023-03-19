import React from 'react';
import { DateTime, Interval } from 'luxon';
import './Appointment.css';

export function TimeSlots({ selectedDay = 'mon', availableSlots }) {
  console.log(selectedDay)
  const gapInMinutes = 30;
  const selectedDaySlots = availableSlots.filter(as => as.day.toLowerCase() === selectedDay.toLowerCase());
  const slots = [];

  selectedDaySlots.forEach(sds => {
    const { day, from, to } = sds;
    const startTime = DateTime.fromFormat(from + ' ' + day, 'H:mm ccc');
    const endTime = DateTime.fromFormat(to + ' ' + day, 'H:mm ccc');
    const noOfTimesLoop = Math.round(Interval.fromDateTimes(startTime, endTime).length('minutes') / gapInMinutes);

    slots.push(Array(noOfTimesLoop).fill('').map((d, i) => <div>
      <button className="btnTime" type="button">
        {startTime.plus({ minutes: gapInMinutes * i }).toFormat('hh:mm')}
      </button>
    </div>
    ))
  })

  return <div className="grid grid-rows-6 grid-flow-col gap-1">
    {slots}
  </div>
}
