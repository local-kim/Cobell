import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("user") ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>Settings</div>
      {
        loggedIn && <button type='button' onClick={() => {
          localStorage.removeItem("user");
          setLoggedIn(false);
        }}>로그아웃</button>
      }
      {
        !loggedIn && 
        <div>
          <button type='button' onClick={() => navigate('/login')}>로그인</button>
          <button type='button' onClick={() => navigate('/join')}>회원가입</button>
        </div>
      }
    </div>
  );
};

export default Settings;