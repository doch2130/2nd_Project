// 리듀서 통합 관리 파일
import { combineReducers } from 'redux';
import loginStatus from './modules/loginStatus';
import invertColor from './modules/invertColor';
import postData from './modules/postData';
import modal from './modules/modal';

export default combineReducers({
  loginStatus,
  invertColor,
  postData,
  modal,
});
