import axios from "axios";
import { getSession } from "next-auth/react";
import { resolve } from "path";
import IUserSession from "../Interfaces/IUser";
const getAllUsernames = async () => {
  const users = await axios.get("api/users?mode=allUsernames");
  return await users.data;
};
const getUserFromUsername = async (username: string) => {
  let response;
  await axios
    .get(`api/users?mode=getUserFromUsername&username=${username}`)
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return response;
};

const gainExperience = async (exp: number) => {
  const user = await getSession().then(
    (session) => session?.user as IUserSession
  );
  await axios
    .post(`api/users?mode=gainExperience&user_id=${user?.id}&exp=${exp}`)
    .then((res) => console.log(res));
};

export { getAllUsernames, getUserFromUsername, gainExperience };
