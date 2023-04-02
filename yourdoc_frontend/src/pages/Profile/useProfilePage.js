import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useUser } from "../../hooks/useUser";
import { useAppointment } from "../../hooks/useAppointment";
import { tempCurrUserPatientId } from "../../utils/constants";
import { DateTime } from "luxon";

export function useProfilePage() {
  const { getUserByIdNType } = useUser();
  const { getAppointmentsByPatientId } = useAppointment();
  const [user, setUser] = useState();
  const [listData, setListData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await getUserByIdNType(tempCurrUserPatientId, 'patient');
      setUser(user);
    })();

    (async () => {
      const patientAppointments = await getAppointmentsByPatientId(tempCurrUserPatientId);
      const listData = patientAppointments.map(pa => ({
        title: pa.name, subTitle: pa.specialization,
        rightText: DateTime.fromISO(pa.datetime).toFormat('dd-LL-yyyy hh:MM'),
        onItemClick: () => navigate('/appointment/' + pa.doctor_id)
      }))
      setListData(listData);
    })();
  }, [])

  return { user, listData }
}