import './App.css';
import Navbaar from './components/header/Navbaar';
import NewNavbaar from './components/newNavbar/NewNavbaar';
import MainComponent from './components/home/MainComponent';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_signin/Sign_in';
import SignUp from './components/signup_signin/Sign_up';
import Cart from './components/cart/Cart';
import Buynow from "./components/buynow/Buynow";
import {Routes,Route, BrowserRouter} from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect,useState } from 'react';

function App() {
  const [data,setData] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },2000)
  },[])
  return (
    <BrowserRouter>
      {data ? (
        <>
          <Navbaar />
          <NewNavbaar />
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/signin" element={<Sign_in />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/getDetail/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className='circle'>
          <CircularProgress/>
          <h2>Loading..</h2>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App;




