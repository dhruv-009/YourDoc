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

  return { getUserById, getUserByIdNType }
}