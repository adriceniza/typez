import axios from "axios";
import { getSession } from "next-auth/react";
import IUserSession from "../Interfaces/IUser";
import IGameRecord from "../Interfaces/IGameRecord";
import { getUserFromUsername } from "./users.service";
import IUser from "../Interfaces/IUser";

const pushGameRecord = async (data: IGameRecord) => {
  const user = (await getSession())?.user as IUser;
  data.userId = user?.id;
  axios.post(`api/gameRecords`, data).then(() => {
    return { status: 200, message: "Success" };
  });
};

const getLastGameRecord = async () => {
  const user = (await getSession())?.user as IUser;
  console.log(user);
  const lastRecord = (
    await axios.get(`api/gameRecords?mode=last&id=${user?.id}`)
  ).data;
  return lastRecord;
};

const getAverageWPM = async (username: string) => {
  const user: IUser = await getUserFromUsername(username);
  const allWPM: Array<Object> = (
    await axios.get(`api/gameRecords?mode=allWPM&id=${user?.id}`)
  ).data;
  return Math.round(
    allWPM.reduce((acc: number, curr: any) => acc + curr.WPMAverage, 0) /
      allWPM.length
  );
};

const getWpmRecord = async (username: string) => {
  const user: IUser = await getUserFromUsername(username);
  const wpm_record = (
    await axios.get(`api/gameRecords?mode=getWpmRecord&id=${user?.id}`)
  ).data;
  return wpm_record?.WPMAverage;
};

export { pushGameRecord, getLastGameRecord, getAverageWPM, getWpmRecord };
