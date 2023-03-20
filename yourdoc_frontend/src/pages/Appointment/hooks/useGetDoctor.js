import { useEffect, useState } from "react";
const BASE_URL = 'http://localhost:3000';

export function useGetDoctor(doctorUserId) {
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    (async () => {
      const { data } = await fetch(BASE_URL + `/doctor/${doctorUserId}`).then(j => j.json())
      setDoctor(data);
    })()
  }, [doctorUserId]);

  return { doctor };
}