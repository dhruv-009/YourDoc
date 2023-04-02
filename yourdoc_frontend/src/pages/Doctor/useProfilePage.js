import { useEffect, useState } from "react";
import { useGetDoctor } from "../../hooks/useGetDoctor";
import {useAppointment} from "../../hooks/useAppointment";
import {useNavigate} from "react-router-dom";
import {tempCurrUserPatientId} from "../../utils/constants";
import { DateTime } from "luxon";
export function useProfilePage() {
  const { getDoctorById } = useGetDoctor();
  const { getAppointmentsByDoctorId } = useAppointment();
  const [user, setUser] = useState();
  const [listData, setListData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const user = await getDoctorById(tempCurrUserPatientId);
      setUser(user);
    })();

    (async () => {
      const doctorAppointments = await getAppointmentsByDoctorId(tempCurrUserPatientId);
      const listData = doctorAppointments.map(pa => ({
        title: pa.name, subTitle: pa.specialization,
        rightText: DateTime.fromISO(pa.datetime).toFormat('dd-LL-yyyy hh:MM'),
        onItemClick: () => navigate('/appointment/' + pa.doctor_id)
      }))
      setListData(listData);
    })();
  }, [])

  return { user, listData }

}