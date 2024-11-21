import React, { useState,useContext } from 'react'
import './sign.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LoginContext } from '../../context/ContextProvider';



const Sign_in = () => {
   const { setAccount } = useContext(LoginContext)

  const [logData, setData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate();


  const addData = (e) => {
    const { name, value } = e.target
    setData(() => {
      return {
        ...logData,
        [name]: value,
      }
    })
  }

  const senddata = async (e) => {
    e.preventDefault()

    const { email, password } = logData

    if (email === '' || password === '') {
      toast.warn('Please fill all the data', {
        position: 'top-center',
      })
    } else {
      try {
        const res = await axios.post('/signin', {
          email,
          password,
        })
        const data = res.data;
        // console.log(res);
        // console.log(data);
        if (res.status === 201) {
          setAccount(data)
          setData({ email: '', password: '' })
          toast.success('You are Logged in successfully', {
            position: 'top-center',
          })
          // navigate(0);  
          // window.location.reload();   
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      } catch (err) {
        if (err.response && err.response.status === 422) {
          toast.warn('Error: Unprocessable Entity (422) - Invalid input!', {
            position: 'top-center',
          })
        } else {
          toast.warn('invalid details', {
            position: 'top-center',
          })
        }
      }
    }
  }
  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./logo.png" alt="shopEase logo"></img>
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={addData}
                  value={logData.email}
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="atlest 6 charac"
                  id="password"
                  onChange={addData}
                  value={logData.password}
                />
              </div>
              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountInfo">
            <p>New to ShopEase</p>
            <NavLink to="/signup">
              <button>Create your ShopEase account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  )
}
export default Sign_in
