import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { success } from './store/modules/loginStatus';
import CombineComponents from './components/CombineComponents';
import Loding from './components/Loding/Loding';
import 'bootstrap/dist/css/bootstrap.min.css';

// axios 기본 url 설정
// 이후 axios 요청 시 기본 url은 빼고 작성하면 된다.
axios.defaults.baseURL = process.env.REACT_APP_BACK_AXIOS;
// true로 설정해야 cookie를 주고 받을 수 있다.
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    async function loginStatus() {
      const result = await axios.post('/auth/login');
      // console.log('loginStatus', result);

      if (result.data.msg === 'Not_Refresh_Cookie') {
        // value 변조되면 req.signedCookies(암호화된 쿠키)에서 값을 못불러와서 not found로 취급된다.
        // console.log('not cookie');
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

      // console.log('Loding Success');
      setTimeout(() => {
        setIsLoding(true);
      }, 1000);
    }

    if (!isLogin) {
      loginStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={!isLoding ? <Loding /> : <CombineComponents />}
        />
      </Routes>
    </>
  );
}

export default App;
