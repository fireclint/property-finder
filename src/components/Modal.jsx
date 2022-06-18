import React from 'react';
import ReactDOM from 'react-dom';

const style = {
  modal: `fixed top-[20%] left-[50%] mr-[-50%] right-[auto] bottom-[auto] translate-x-[-50%] bg-white rounded-md z-10`,
  overlay: `fixed top-0 left-0 right-0 bottom-0 bg-gray-900/70 z-10`,
};

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className={style.overlay}></div>
      <div className={style.modal}>
        <div className='p-4'>
          <div className='text-right'>
            <button onClick={onClose} className='border'>
              Close
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
