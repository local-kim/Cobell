import React, { useEffect, useState } from 'react';
import { MenuTitle } from '../../components';
import axios from 'axios';
import styles from './notification.module.css';
import NotificationItem from './NotificationItem';

const Notification = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [notiList, setNotiList] = useState([]);

  useEffect(() => {
    axios.get(`/api/noti/${user.id}`)
    .then(res => {
      console.log(res.data);
      setNotiList(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <MenuTitle title={"알림"} leftIcon={"arrow_back_ios"} visible={false}/>

      <div className={styles.noti_list}>
        {
          notiList && notiList.map(noti => (
            <NotificationItem noti={noti} setNotiList={setNotiList} key={noti.id}/>
          ))
        }
      </div>
    </div>
  );
};

export default Notification;