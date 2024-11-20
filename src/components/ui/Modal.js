import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import modalStyle from "./Modal.module.css";

// alertRef만 받아옴
export function Alert({ alertRef }) {
  const modalRef = useRef();

  const [message, setMessage] = useState([]);

  const onClickCloseButtonHandler = () => {
    modalRef.current.close();
  };

  // state에 alert에 보여줄 메세지를 전달한다.
  useImperativeHandle(alertRef, () => {
    return {
      show(messages) {
        modalRef.current.showModal();
        setMessage(messages);
      },
      close() {
        modalRef.current.close();
        setMessage([]);
      },
    };
  });

  // 프래그먼트로 리턴
  return (
    <>
      {createPortal(
        <dialog className={modalStyle.modal} ref={modalRef}>
          <section
            className={modalStyle.modalTitle}
            onClick={onClickCloseButtonHandler}
          >
            X
          </section>
          <ul className={modalStyle.modalMessages}>
            {message.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </dialog>,
        document.getElementById("modals")
      )}
    </>
  );
}
