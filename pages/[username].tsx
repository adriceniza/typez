import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import useLevel from '../hooks/useLevel';
import IUserSession from '../Interfaces/IUser';
import IUser from '../Interfaces/IUser';
import ILevel from '../Interfaces/ILevel'
import { getUserFromUsername } from '../services/users.service'
import styles from '../styles/Profile.module.css'
import ModalTerminal from '../components/Terminal/modalTerminal';
import Layout from '@components/Layout';

export default function username() {
  const router = useRouter();
  const [user, setUser] = useState<IUser>()
  const [level, setLevel] = useState<ILevel | undefined>({
    level: 0,
    level_max_exp: 1000
  })
  const [levelProgress, setLevelProgress] = useState(0)

  const fetchUser = () => {
    let username = router.asPath.slice(1)
    getUserFromUsername(username)
      .then(res => {
        let response = res as any
        setUser(response?.data)
      })
      .catch(err => { console.log(`Error : ${err}`); router.push('/terminal') })
  }
  useEffect(() => {
    setLevel(useLevel(user as IUserSession))
    setTimeout(() => { setLevelProgress(user?.exp as number) }, 1)
  }, [user])

  useEffect(() => {
    fetchUser();
  }, [router])

  useEffect(() => {
    fetchUser();
  }, [])
  return (

    user &&
    <>

      <Layout>
        <ModalTerminal />
        <div className={styles.profile_container} >
          <div className={styles.profile_header}>
            <h1 className={styles.profile_name}>{user?.username}</h1>
            <img className={styles.profile_pic} src={user?.image} alt="user" />
            <div className={styles.profile_level}>{level?.level}</div>
            <progress className={styles.profile_level__progress_bar} value={levelProgress} max={level?.level_max_exp}>{user?.exp}</progress>
            <span className={styles.xp_label}>{user?.exp}xp</span>
          </div>
        </div>
      </Layout>

    </>

  )
}

