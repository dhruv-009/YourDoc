import React from 'react';
import { DateTime } from 'luxon';
import './Appointment.css';

export function DaySelector(props) {
  const { luxSelectedDay = DateTime.now(), setLuxSelectedDay } = props;
  const luxStartOfWeekDay = luxSelectedDay.startOf('week');

  return Array(7).fill('d').map((d, i) => {
    const luxCurrentDay = luxStartOfWeekDay.plus({ days: i });

    return <div onClick={() => setLuxSelectedDay(luxCurrentDay)}
      className={luxSelectedDay.toFormat('yyyyMMdd') === luxCurrentDay.toFormat('yyyyMMdd') ? 'day selected' : 'day'}
    >
      <div className="flex items-center px-4 py-4" >
        <div className="text-center">
          <p className="text-gray-800 dark:text-gray-300 group-hover:text-blue-700 text-sm transition-all duration-150">{luxCurrentDay.toFormat('ccc')}</p>
          <p className="text-gray-800 dark:text-gray-300 group-hover:text-blue-700 mt-3 group-hover:font-bold transition-all	duration-150">{Number(luxCurrentDay.toFormat('d'))}</p>
        </div>
      </div >
    </div>
  })
}