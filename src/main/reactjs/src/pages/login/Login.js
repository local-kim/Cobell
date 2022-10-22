import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    axios.post("/user/login", {email, password})
    .then(res => {
      if(res.data == null){
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
      else{
        // alert("로그인 성공");

        // 로그인 유지
        localStorage.setItem("user", JSON.stringify(res.data));
        // user 정보를 다시 객체로
        // console.log(JSON.parse(localStorage.getItem("user")));
        navigate("/");
      }
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <h1>로그인</h1>

      <form onSubmit={login}>
        <table>
          <tbody>
            <tr>
              <th>email</th>
              <td>
                <input type='text' required onChange={(e) => {
                  setEmail(e.target.value);
                }}/>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <input type='password' required onChange={(e) => setPassword(e.target.value)}/>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <button type="submit">Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Login;