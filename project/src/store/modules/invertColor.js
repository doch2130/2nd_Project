// 초기 상태 설정
const initState = {
  invertColor: true,
};

// 액션 타입 정의하기
const INVERT = 'color/INVERT';

// 액션 생성 함수 설정
// Payload = 컴포넌트에서 보내준 데이터를 전달하는 역할을 한다.
export function invert(payload) {
  return {
    type: INVERT,
    payload,
  };
}

// reducer
export default function invertColor(state = initState, action) {
  // 리듀서에서는 state를 반환해줘야 하는데 현재 console.log()를 반환해서 경고창이 나온것이다.
  // console.log(action.payload);
  switch (action.type) {
    case INVERT:
      return {
        ...state,
        invertColor: action.payload,
      };
    default:
      return state;
  }
}
