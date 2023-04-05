import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useCookies } from "react-cookie";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { useUser } from "../../hooks/useUser";
import { useAppointment } from "../../hooks/useAppointment";

export function useProfilePage() {
  const { getUserByIdNType } = useUser();
  const { getAppointmentsByPatientId } = useAppointment();
  const [user, setUser] = useState();
  const [listData, setListData] = useState();
  const [cookie] = useCookies(["session"]);
  const navigate = useNavigate();
  let patientId;
  try {
    const { id } = jwtDecode(cookie.session);
    patientId = id;
  } catch { }

  useEffect(() => {
    if (!cookie.session) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    (async () => {
      const user = await getUserByIdNType(patientId, 'patient');
      setUser(user);
    })();

    (async () => {
      const patientAppointments = await getAppointmentsByPatientId(patientId);
      const listData = patientAppointments.map(pa => ({
        title: pa.name, subTitle: pa.specialization,
        rightText: DateTime.fromISO(pa.datetime).toFormat('dd-LL-yyyy hh:MM'),
        onItemClick: () => navigate('/appointment/' + pa.doctor_id)
      }))
      setListData(listData.length ? listData : [""]);
    })();
  }, [])

  return { user, listData }
}