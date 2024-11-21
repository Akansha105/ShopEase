import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Sign_up = () => {
  const [udata, setUdata] = useState({
    fname: '',
    email: '',
    number: '',
    password: '',
    cpassword: '',
  })

  const addData = (e) => {
    const { name, value } = e.target
    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      }
    })
  }

  const validatePassword = (pass) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return pattern.test(pass);
  }
  const senddata = async (e) => {
    e.preventDefault()
    const { fname, email, number, password, cpassword } = udata
    if (fname === '') {
      toast.warn('Please fill your name', {
        position: 'top-center',
      })
    } else if (email === '' || number === '' || cpassword === '') {
      toast.warn('Please fill all the data', {
        position: 'top-center',
      })
    }
    else if (!validatePassword(password.trim())) {
      toast.warn(
        'Password must be at least 6 characters long, and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        {
          position: 'top-center',
          autoClose: 5000,
        }
      )
      return;
    } else {
      try {
        const res = await axios.post('/signup', {
          fname,
          email,
          number,
          password,
          cpassword,
        })
        const data = res.data
        if (res.status === 201) {
          toast.success('data successfully added', {
            position: 'top-center',
          })
          setUdata({
            ...udata,
            fname: '',
            email: '',
            number: '',
            password: '',
            cpassword: '',
          })
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
    <div className="signup">
      <div className="sign_container">
        <div className="sign_header">
          <img src="./logo.png" alt="shopEase logo"></img>
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign Up</h1>
            <div className="form_data">
              <label htmlFor="fname">Your Name</label>
              <input
                type="text"
                name="fname"
                value={udata.fname}
                onChange={addData}
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={udata.email}
                onChange={addData}
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile Number</label>
              <input
                type="text"
                name="number"
                value={udata.number}
                onChange={addData}
                id="number"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="atlest 6 charac"
                value={udata.password}
                onChange={addData}
                id="password"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                type="password"
                name="cpassword"
                value={udata.cpassword}
                onChange={addData}
                id="cpassword"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>
            <div className="signin_info">
              <p>Already have an account</p>
              <NavLink to="/signin">SignIn</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}
export default Sign_up
