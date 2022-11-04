import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from './Join.module.css';
import FirstJoin from './FirstJoin';
import SecondJoin from './SecondJoin';

const Join = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    // email: '',
    // password: '',
    // nickname: '',
    // gender: '',
    // age: '',
    // goal: '',
    // height: '',
    // weight: '',
    // title: '',
    // content: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    // 이벤트 발생한 name이 pass일 경우 무조건 passOk는 false
    // if(name === 'pass')
    //   setPassOk(false);

    setUser({
      ...user,
      [name]: value
    });

    console.log(user);
  }

  const joinUser = (e) => {
    // e.preventDefault();
    
    axios.post('/user/join', user)
    .then(res => {
      // console.log('회원가입 성공');
      navigate("/login", {replace: true});
    }).catch(err => console.log(err));
  }

  const [page, setPage] = useState(1);

  return (
    <div className={styles.join_wrap}>
      <div className={styles.title}>COBELL</div>

      { page == 1 ? <FirstJoin user={user} handleChange={handleChange} setPage={setPage} /> : <SecondJoin user={user} handleChange={handleChange} setUser={setUser} joinUser={joinUser} /> }
      
    </div>
  );
};

export default Join;