import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useUser } from "../../hooks/useUser";

export const Fields = [
  { type: 'email', placeholder: 'Email address', id: 'email', isRequired: true },
  { type: 'password', placeholder: 'Password', id: 'password', isRequired: true },
];

export function useLoginPage() {
  const [loginState, setLoginState] = useState('isInit');
  const { type } = useParams();
  const { getPatientAccessByEmailNPassword, getDoctorAccessByEmailNPassword } = useUser();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const formValues = Fields.reduce((p, c) => ({ ...p, [c.id]: e.target[c.id].value }), {});
    setLoginState('isLoading');
    let accessToken;
    if (type === 'doctor') {
      accessToken = await getDoctorAccessByEmailNPassword(formValues.email, formValues.password);
    } else {
      accessToken = await getPatientAccessByEmailNPassword(formValues.email, formValues.password);
    }
    setCookie("session", accessToken, { path: "/" });
    setLoginState('isSuccess');
    navigate('/profile');
  }

  return { onSubmitLogin, loginState }
}