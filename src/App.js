import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm.js'
import Landing from './components/Landing/Landing';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Recaptcha from 'react-recaptcha';
import RegForm from './components/RegForm';

function App() {
  
  return (
    <div className="App">
      <Landing/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
