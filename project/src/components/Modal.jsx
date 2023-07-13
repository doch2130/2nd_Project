import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalClose } from '../store/modules/modal';

import style from './Modal.module.css';
import close from '../assets/icon/plus.png';

const Backdrop = (props) => {
  return <>
    {props.backDropEvent && <div className={style.backdrop} onClick={props.onClose} />}
    {!props.backDropEvent && <div className={style.backdrop} />}
  </>;
};

const ModalOverlay = (props) => {
  const { modalDataState } = props;
  return (
    <div className={modalDataState.size === 'lg' ? `${style.modal} ${style.lgModal}` :
    modalDataState.size === 'md' ? `${style.modal} ${style.mdModal}`  : `${style.modal} ${style.smModal}`} >
      <div className={style.wrapClose} onClick={props.onClose}>
        <img src={close} alt='closeBtn' />
      </div>
      <div className={style.content}>{modalDataState.content}</div>
    </div>
  );
};

const modalElement = document.getElementById('modal');

function Modal() {
  const dispatch = useDispatch();
  const onCloseHandler = () => {
    dispatch(modalClose());
  };

  const modalDataState = useSelector((state) => state.modal);
  // console.log('modalDataState2', modalDataState);

  return (
    <>
    {modalDataState.isOpen && (
      <>
        {ReactDOM.createPortal(
          // <Backdrop onClose={closeModal} backDropEvent={modalDataState.backDrop} />,
          <Backdrop onClose={onCloseHandler} backDropEvent={modalDataState.backDrop} />,
          modalElement
        )}
        {ReactDOM.createPortal(
          // <ModalOverlay onClose={closeModal} modalDataState={modalDataState} />,
          <ModalOverlay onClose={onCloseHandler} modalDataState={modalDataState} />,
          modalElement
        )}
      </>
    )}
    </>
  );
};

export default Modal;
