// 리듀서 통합 관리 파일
import { combineReducers } from 'redux';
import loginStatus from './modules/loginStatus';

export default combineReducers({
    loginStatus,
});
