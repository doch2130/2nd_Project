const initState = {
  isOpen: false,
  backDrop: false,
  size: 'lg',
  content: '',
};

const OPEN = 'open/modal';
const CLOSE = 'close/modal';

export function modalOpen(payload) {
  return {
    type: OPEN,
    payload,
  };
}

export function modalClose(payload) {
  return {
    type: CLOSE,
    payload,
  };
}

export default function modalStatus(state = initState, action) {
  switch (action.type) {
    case OPEN:
      const { backDrop, content, size } = action.payload;
      document.body.style.overflow = 'hidden';
      return {
        ...state,
        isOpen: true,
        backDrop: backDrop,
        content: content,
        size: size,
      };
    case CLOSE:
      document.body.style.overflow = 'auto';
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
