import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Test from './components/Test';

// axios 기본 url 설정
// 이후 axios 요청 시 기본 url은 빼고 작성하면 된다.
axios.defaults.baseURL = 'http://localhost:4000';
// true로 설정해야 refreshToken cookie를 주고 받을 수 있다.
axios.defaults.withCredentials = true;

function App() {
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  return (
    <>
      {/* <div>
        <span>테스트</span>
      </div> */}
      <Routes>
        {isLogin ? <Route path="/" element={<Test />} /> : <Route path="/" element={<Login />} /> }
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
