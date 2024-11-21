import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import { LoginContext } from '../../context/ContextProvider'
import { NavLink } from 'react-router-dom'
import { Divider } from '@mui/material'
import "./rightheader.css"

const Rightheader = ({ logClose }) => {
  const { account, setAccount } = useContext(LoginContext)

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account?.fname ? (
            <Avatar className="avatar2">
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avatar" />
          )}
          { account?<h3>Hello , {account.fname.toUpperCase()}</h3>:""}
        </div>
        <div className="nav_btn" onClick={() => logClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>
          <Divider style={{ width: '100%', marginLeft: '-20px' }} />
          <NavLink to="/">Today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your Orders</NavLink>
          ) : (
            <NavLink to="/signin">Your Orders</NavLink>
          )}
          <Divider style={{ width: '100%', marginLeft: '-20px' }} />
          <NavLink to="/">Settings</NavLink>
          <img src="" alt="" />
          {/* <NavLink to="/signin">Sign in</NavLink> */}
        </div>
      </div>
    </>
  )
}
export default Rightheader
