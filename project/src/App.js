import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Test from './components/Test';
import { useEffect } from 'react';
import { success } from './store/modules/loginStatus';

// axios 기본 url 설정
// 이후 axios 요청 시 기본 url은 빼고 작성하면 된다.
axios.defaults.baseURL = 'http://localhost:4000';
// true로 설정해야 refreshToken cookie를 주고 받을 수 있다.
axios.defaults.withCredentials = true;

function App() {
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const result = await axios.post('/auth/login');
      // console.log('loginStatus', result);

      if (result.data.msg === 'Not_Refresh_Cookie') {
        // value 변조되면 req.signedCookies(암호화된 쿠키)에서 값을 못불러와서 not found로 취급된다.
        console.log('not cookie');
        // navigate('/login');
      } else if (result.data.msg === 'login status success') {
        const { accessToken } = result.data;
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        // 로그인 정보 reducer로 전달
        dispatch(success({ id: result.data.id }));
      } else if (result.data.msg === 'Refresh_Token_Expired') {
        alert('로그인이 만료되었습니다. 다시 로그인 해야 합니다.');
        navigate('/login');
      }
    }

    if (!isLogin) {
      loginStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/* <div>
        <span>테스트</span>
      </div> */}
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
  );
}

export default App;
