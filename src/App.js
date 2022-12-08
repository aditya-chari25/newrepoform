import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm.js'
import Landing from './components/Landing/Landing';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div className="App">
      <ToastContainer/>
      <Landing/>
    </div>
  );
}

export default App;
