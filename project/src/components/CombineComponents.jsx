import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import Test from './Test';
import { useSelector } from 'react-redux';

export default function CombineComponents() {
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  return (
    <>
      <Routes>
      {/* 첫 페이지 접속 시 로그인 안했으면 Login 페이지 출력 */}
      {/* 로그인 한 상태면 Login 페이지 출력 */}
      <Route path="/" element={isLogin ? <Test /> : <Login />} />

      {/* 로그인, 회원가입 페이지는 로그인 안했을 때만 접근 가능하게 설정 */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
