import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLevel from "../hooks/useLevel";
import IUserSession from "../Interfaces/IUser";
import IUser from "../Interfaces/IUser";
import ILevel from "../Interfaces/ILevel";
import { getUserFromUsername } from "../services/users.service";
import styles from "../styles/Profile.module.css";
import ModalTerminal from "../components/Terminal/modalTerminal";
import Layout from "@components/Layout";
import IGameRecord from "@interfaces/IGameRecord";
import { getAverageWPM, getWpmRecord } from "@services/gamerecords.service";
export default function username() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>();
  const [level, setLevel] = useState<ILevel | undefined>({
    level: 0,
    level_max_exp: 1000,
  });
  const [levelProgress, setLevelProgress] = useState(0);
  const [WpmRecord, setWpmRecord] = useState(0);
  const [avg, setAvg] = useState(0)

  const fetchUser = () => {
    let username = router.asPath.slice(1);
    getUserFromUsername(username)
      .then((res) => {
        let response = res as any;
        setUser(response);
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
        router.push("/terminal");
      });
  };
  useEffect(() => {
    user !== undefined && setLevel(useLevel(user as IUserSession));
    setTimeout(() => {
      setLevelProgress(user?.exp as number);
    }, 1);
    const getAvg = async () => {
      const avg = await getAverageWPM(user?.username as string)
      setAvg(avg)
    }
    const getWpmRec = async () => {
      const wpm_record = await getWpmRecord(user?.username as string);
      setWpmRecord(wpm_record)
    }
    getAvg()
    getWpmRec();
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    user && (
      <>
        <Layout>
          <ModalTerminal />
          <div className={styles.container}>
            <div className={styles.header}>
              <h1 className={styles.name}>{user?.username}</h1>
              <img className={styles.pic} src={user?.image} alt="user" />
              <div className={styles.level}>{level?.level}</div>
              <progress
                className={styles.level__progress_bar}
                data-exp={user?.exp}
                value={levelProgress}
                max={level?.level_max_exp}
              >
                {user?.exp}
              </progress>
            </div>
            <div className={styles.section}>
              <div className={styles.subsection}>
                <div className={styles.subtitle}>Average wpm</div>
                <div className={styles.text_content}>{avg}</div>
              </div>
              <div className={styles.subsection}>
                <div className={styles.subtitle}>Wpm record</div>
                <div className={styles.text_content}>{WpmRecord}</div>
              </div>
              <div className={styles.subsection}>
                <div className={styles.subtitle}>Most played game</div>
                <div className={styles.text_content}>{"Typing test"}</div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.title}>Records</div>
              <select onChange={(e) => { console.log(e) }} className={styles.filter_by} id="filter_by">
                <option value="date">Date</option>
                <option value="date">Wpm</option>
                <option value="date">Exp</option>

              </select>
              <ul className={styles.gameresults}>
                {user?.gameresults.map((gr: IGameRecord) => {
                  return (
                    <li
                      className={styles.gameresults_items}
                      key={gr.id as string}
                    >
                      <div className={styles.gameresults_item}>
                        <span className={styles.gameresults_item_title}>
                          Mode
                        </span>
                        <span className={styles.gameresults_item_content}>
                          {gr.gameId}
                        </span>
                      </div>
                      <div className={`${styles.gameresults_item}`}>
                        <span
                          className={
                            WpmRecord === gr.WPMAverage
                              ? styles.WpmRecord
                              : styles.hidden
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trophy-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z" />
                          </svg>
                        </span>
                        <span className={styles.gameresults_item_title}>
                          WPM
                        </span>
                        <span className={styles.gameresults_item_content}>
                          {gr.WPMAverage}
                        </span>
                      </div>
                      <div className={styles.gameresults_item}>
                        <span className={styles.gameresults_item_title}>
                          Exp
                        </span>
                        <span className={styles.gameresults_item_content}>
                          {gr.expEarned}
                        </span>
                      </div>
                      <div className={styles.gameresults_item}>
                        <span className={styles.gameresults_item_title}>
                          Date
                        </span>
                        <span className={styles.gameresults_item_content}>
                          {gr.timestamp?.substring(0, 10)}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Layout>
      </>
    )
  );
}
