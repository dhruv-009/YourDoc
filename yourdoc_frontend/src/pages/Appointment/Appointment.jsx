import React, { useEffect, useState } from 'react';
import './Appointment.css';
import { Navbar } from '../../components/NavBar';
import { TimeSlots } from './TImeSlots';
import { DaySelector } from './DaySelector';
import { DoctorCard } from './DoctorCard';

const BASE_URL = 'http://localhost:3000'
function useAppointment(doctorUserId) {

  useEffect(async () => {
    const a = await fetch(BASE_URL + '/').then(j => j.json());
  }, []);
}

export function Appointment() {
  const availableSlots = [{ day: 'mon', from: "8:30", to: "12:30" }, { day: 'mon', from: "16:30", to: "21:30" }, { day: 'sun', from: "12:00", to: "15:30" }];
  const [luxSelectedDay, setLuxSelectedDay] = useState();


  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col xl:flex-row dark:bg-black bg-gray-100 p-6">
        <div className="flex-1 max-w-screen-sm mx-auto">
          <DoctorCard />
        </div>
        <div className="flex-1 w-full max-w-screen-sm mx-auto flex-wrap">
          <div className="justify-center flex bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-x-scroll mx-auto py-4 px-2 md:mx-12">
            {/* <button type="button" className="btnArrow">←</button> */}
            <DaySelector luxSelectedDay={luxSelectedDay} setLuxSelectedDay={setLuxSelectedDay} />
            {/* <button type="button" className="btnArrow">→</button> */}
          </div>
          <TimeSlots selectedDay={luxSelectedDay?.toFormat('ccc')} availableSlots={availableSlots} />
        </div>
      </div>
    </div>
  );
}
