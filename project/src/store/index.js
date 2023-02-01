// 리듀서 통합 관리 파일
import { combineReducers } from 'redux';
import loginStatus from './modules/loginStatus';
import invertColor from './modules/invertColor';

export default combineReducers({
  loginStatus,
  invertColor,
});
