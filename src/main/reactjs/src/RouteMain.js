import React from "react";
import { Route, Routes } from "react-router-dom";
import { Challenge, ChallengeList, Liked, NewChallenge } from "./pages/lounge";
import { Login, Join } from "./pages/login";
import { Report } from "./pages/report";
import { Mypage, ProfileEdit } from "./pages/mypage";
import "./App.css";
import { Settings } from "./pages/settings";
import { MenuBar } from "./components";

const RouteMain = () => {
 
  return (
    <div id="main">
      <Routes>
        {/* 리포트(메인) */}
        <Route path="/report" element={<Report/>} />

        {/* 라운지 */}
        <Route path="/lounge" element={<ChallengeList/>} />
        <Route path="/lounge/:challengeId" element={<Challenge/>} />
        <Route path="/lounge/new" element={<NewChallenge/>} />
        <Route path="/lounge/like" element={<Liked/>} />

        {/* 마이페이지 */}
        <Route path="/profile" element={<Mypage/>} />
        <Route path="/profile/edit" element={<ProfileEdit/>} />

        {/* 로그인 */}
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />

        {/* 설정 */}
        <Route path="/settings" element={<Settings/>} />
      </Routes>

      <MenuBar/>
    </div>
  )
}

export default RouteMain;
