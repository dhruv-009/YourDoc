import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import jwtDecode from "jwt-decode";
import { useAppointment } from "../../hooks/useAppointment";
import { tempCurrUserPatientId } from "../../utils/constants";
import { useCookies } from "react-cookie";

export function useProfilePage() {
  const { getAppointmentsByDoctorId } = useAppointment();
  let user;
  const [listData, setListData] = useState();
  const [cookie] = useCookies(["session"]);
  const navigate = useNavigate();
  try {
    user = jwtDecode(cookie.session);
  } catch { }

  useEffect(() => {
    if (!user?.type) {
      navigate('/');
    }
  }, [user])

  useEffect(() => {
    (async () => {
      const doctorAppointments = await getAppointmentsByDoctorId(tempCurrUserPatientId);
      const listData = doctorAppointments.map(pa => ({
        title: pa.name, subTitle: pa.specialization,
        rightText: DateTime.fromISO(pa.datetime).toFormat('dd-LL-yyyy hh:MM'),
        onItemClick: () => navigate('/appointment/' + pa.doctor_id)
      }))
      setListData(listData);
    })();
  }, []);

  return { user, listData }

}