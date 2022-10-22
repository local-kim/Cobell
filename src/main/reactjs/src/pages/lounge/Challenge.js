import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Lounge.module.css';

const Challenge = () => {
  const {challengeId} = useParams();
  const [challenge, setChallenge] = useState({});

  useEffect(() => {
    axios.get(`/challenge/${challengeId}`)
    .then(res => {
      console.log(res.data);
      setChallenge(res.data);
    }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>챌린지 상세</h1>
      <div >{challenge.title}</div>
      <div>
        <span className={`material-icons ${styles.icon}`}>group</span>
        {/* TODO: 챌린지에 참여한 유저수 */}
        1/{challenge.limit}
      </div>
      <div>{challenge.content}</div>
    </div>
  );
};

export default Challenge;