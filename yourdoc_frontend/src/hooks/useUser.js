import { API_BASE_URL } from "../utils/constants";

export function useUser() {
  const getUserById = async (userId) => {
    const { data } = await fetch(API_BASE_URL + `/user/${userId}`).then(j => j.json())

    return data;
  }

  const getUserByIdNType = async (userId, type) => {
    const { data } = await fetch(API_BASE_URL + `/user/bytype?userId=${userId}&type=${type}`).then(j => j.json())

    return data;
  }

  const setUserPatient = async (user) => {
    // to send email remove no_email: true and just stringify user
    const body = JSON.stringify({ ...user, no_email: true });
    await fetch(API_BASE_URL + '/patientRegistration', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body
    }).then(j => j.json());
  }

  return { getUserById, getUserByIdNType, setUserPatient }

  // return { getUserById, getUserByIdNType }
}