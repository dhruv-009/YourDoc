import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { ToastContext } from "../../contexts/contexts";
import { useUser } from "../../hooks/useUser";

export const Fields = [
  { type: 'email', placeholder: 'Email address', id: 'email', isRequired: true },
  { type: 'password', placeholder: 'Password', id: 'password', isRequired: true },
]
export function useLoginPage() {
  const [loginState, setLoginState] = useState('isInit');
  const { getPatientAccessByEmailNPassword } = useUser();
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const formValues = Fields.reduce((p, c) => ({ ...p, [c.id]: e.target[c.id].value }), {});
    setLoginState('isLoading');
    const accessToken = await getPatientAccessByEmailNPassword(formValues.email, formValues.password);
    setCookie("session", accessToken, { path: "/" });
    setLoginState('isSuccess');
    navigate('/profile');
  }

  return { onSubmitLogin, loginState }
}