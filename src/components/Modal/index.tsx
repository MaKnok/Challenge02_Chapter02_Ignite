import { useState,useEffect,useRef,ReactNode } from 'react';
import ReactModal from 'react-modal';

interface ModalProps{
  children: ReactNode
  isOpen: boolean,
  setIsOpen:()=>void
}

const Modal = ({children, isOpen, setIsOpen}:ModalProps): JSX.Element => {
  const [modalStatus,setModalStatus] = useState(false);

  const prevModalRef = useRef<boolean>();

  useEffect(()=>{
    prevModalRef.current = isOpen;
  })

  const modalPreviousValue = prevModalRef.current ?? isOpen;

  useEffect(()=>{
    if (modalPreviousValue !== isOpen){
      console.log(isOpen, setIsOpen);
      setModalStatus(isOpen) 
    }
  },[isOpen,setIsOpen,modalPreviousValue]);



    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
    );
};


export default Modal;
