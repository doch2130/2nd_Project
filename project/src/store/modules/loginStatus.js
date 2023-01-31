// 초기 상태 설정
const initState = {
  isLogin: false,
  id: '',
};

// 액션 타입 정의하기
const SUCCESS = 'login/SUCCESS';
const LOGOUT = 'login/LOGOUT';
const UNREGISTER = 'login/UNREFISTER';

// 액션 생성 함수 설정
// Payload = 컴포넌트에서 보내준 데이터를 전달하는 역할을 한다.
export function success(payload) {
  return {
    type: SUCCESS,
    payload,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function unRegister() {
  return {
    type: UNREGISTER,
  };
}

// reducer
export default function loginStatus(state = initState, action) {
  // 리듀서에서는 state를 반환해줘야 하는데 현재 console.log()를 반환해서 경고창이 나온것이다.
  switch (action.type) {
    case SUCCESS:
      return {
        // ...state를 사용하는 이유는
        // state.list 말고 다른 state.user 같은 것들이 있는 경우를 생각해야 한다.
        // return list만 전달하면 state.list만 남고 나머지 애들이 사라진다.
        // 그래서 전개연산자를 이용해서 state에 있는 다른 애들을 기본 값으로 저장을 먼저 하고,
        // 변경하고 싶은 값을 설정한다.
        // concat() 함수를 사용하여 배열을 추가할 수 있으며,
        // push() 함수도 가능은 하지만 반환 값이 concat()과 다른 숫자로 반환이 되서 사용시 주의가 필요하다.
        ...state,
        isLogin: true,
        id: action.payload.id,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
        id: '',
      };
    case UNREGISTER:
      return {
        ...state,
        isLogin: false,
        id: '',
      };
    // case DONE:
    //   return {
    //     ...state,
    //     list: state.list.map((el) => {
    //       if (el.id === action.id) {
    //         return {
    //           ...el,
    //           done: true,
    //         };
    //       } else {
    //         return el;
    //       }
    //     }),
    //   };
    default:
      return state;
  }
}
