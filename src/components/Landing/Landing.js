import React, { useState } from "react";
import Modal from 'react-modal';
import LoginForm from "../LoginForm";
import RegForm from "../RegForm";
import { setAuthToken } from "../../services/setAuthToken";

function Landing(){
    const [auth,setAuth] = useState(false);
    const [login,setLogin] = useState(false);

    const token = sessionStorage.getItem("token");

    if(token){
        setAuthToken(token);
    }

    console.log(auth);
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
    const [modalLogOpen, setLogOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setLogOpen(false);
    }
    function openModalLog() {
        setLogOpen(true);
        setIsOpen(false);
    }
    return(
        <div>
            {/* <button onClick={openModal}>Log In</button> */}
            {(token) ? (<button className='Login'>Dashboard </button>) : (<button onClick={openModal} className='Login'>Login / Register</button>)}
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>

            <RegForm/>
            <button onClick={openModalLog}>Login Form</button>
        </Modal>
        <Modal
            isOpen={modalLogOpen}
            onRequestClose={closeModal}
            style={customStyles}>

            <LoginForm auth={auth} setAuth={setAuth} login={login} setLogin={setLogin} closing={closeModal}/>
            <button onClick={closeModal}>Close</button>
        </Modal>

        </div>
    );
}

export default Landing;