import axios from "axios";
import { getSession } from "next-auth/react";
import IUserSession from "../Interfaces/IUser";
import IGameRecord from "../Interfaces/IGameRecord";

const pushGameRecord = async (data: IGameRecord) => {
  const user = await getSession().then(
    (session) => session?.user as IUserSession
  );
  data.userId = user?.id;
  axios.post(`api/gameRecords`, data).then(() => {
    return { status: 200, message: "Success" };
  });
};

const getLastGameRecord = async () => {
  const user = await getSession().then(
    (session) => session?.user as IUserSession
  );
  const lastRecord = await axios.get(
    `api/gameRecords?mode=last&id=${user?.id}`
  );
  return lastRecord.data;
};

const getAverageWPM = async () => {
  const user = await getSession().then(
    (session) => session?.user as IUserSession
  );
  const allWPM = await (
    await axios.get(`api/gameRecords?mode=allWPM&id=${user?.id}`)
  ).data;
  return Math.round(
    allWPM.reduce((acc: number, curr: any) => acc + curr.WPMAverage, 0) /
      allWPM.length
  );
};


export { pushGameRecord, getLastGameRecord, getAverageWPM };
