import { useEffect, useState } from "react";
const BASE_URL = 'http://localhost:3000';

export function useGetAvailability(doctorUserId) {
  const [availableSlots, setAvailableSlots] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await fetch(BASE_URL + `/availability?doctor_id=${doctorUserId}`).then(j => j.json())
      setAvailableSlots(data);
    })()
  }, [doctorUserId]);

  return { availableSlots };
}