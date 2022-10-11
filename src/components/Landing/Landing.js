import React, { useState } from "react";
import Modal from 'react-modal';
import LoginForm from "../LoginForm";
import RegForm from "../RegForm";

function Landing(){
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          overflowY:'scroll',
          width: '50vw',
          height: '50vh'
        },
    };
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    return(
        <div>
            <button onClick={openModal}>Sign In</button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>

            <RegForm/>
            <button onClick={closeModal}>closeModal</button>
        </Modal>
        </div>
    );
}

export default Landing;