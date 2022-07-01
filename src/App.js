
import './App.css';
import {useState,useEffect} from 'react'
import {getToken1,onMessageListener} from './firebase'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  getToken1(setTokenFound);


    return (
        <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
  
  
  
  function ScrollToTop() {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  
}

export default App;
