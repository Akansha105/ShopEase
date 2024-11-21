import React, { useContext, useEffect, useState } from 'react'
import './navbaar.css'
import SearchIcon from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Avatar from '@mui/material/Avatar'
import { LoginContext } from '../../context/ContextProvider'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import Rightheader from './Rightheader'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import LogoutIcon from '@mui/icons-material/Logout'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

const Navbaar = () => {
  const { account, setAccount } = useContext(LoginContext)
  const [dropen, setDropen] = useState(false)
  const [text,setText] = useState("");
  // console.log(text);
  const [liopen,setLiopen] = useState(true);

    const { products } = useSelector((state) => state.getproductsdata)

  // we will show our product in list
  const history = useNavigate();
  // const [localAccount, setLocalAccount] = useState(account)
  // const [ loggedIn, setLoggedIn ] = useState(false)
  // let loggedIn = false;
  // console.log(account +"here is the data");

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const getValiduser = async () => {
    try {
      const res = await axios.get('/validuser')
      const data = res.data
      // console.log(data);

      if (res.status !== 201) {
        console.log('ERROR')
      } else {
        console.log('data valid')
        setAccount(data)
        // setLocalAccount(data)
        // setLoggedIn(true)
      }
    } catch (err) {
      console.log('ERROR IN NAVBAR.JS', err)
    }
  }

  const handleclose = () => {
    setDropen(false)
  }
  const handleopen = () => {
    setDropen(true)
  }

  // useEffect(() => {
  //   if (!loggedIn && !account) {
  //     getValiduser()
  //   }
  // }, [loggedIn,account]) // Only refetches data once after login, not every time account changes

  const logoutuser = async () => {
    try {
      const res2 = await axios.get('/logout')
      // const data2 = res2.data
      // console.log(data);

      if (res2.status !== 201) {
        console.log('ERROR')
      } else {
        console.log('logout successful')
        toast.success('You are Logged out successfully', {
          position: 'top-center',
          autoClose: 3000,
        })
        history('/')
        setAccount(null)
        // setLocalAccount(data)
        // setLoggedIn(true)
      }
    } catch (err) {
      if (err.response?.status === 401) {
      console.log('Unauthorized: Invalid session or token');
    } else {
      console.log('ERROR IN NAVBAR.JS', err.message);
    }
  }
}


const getText =(item)=>{
  setText(item);
  setLiopen(false);
}


  useEffect(() => {
    if (!account) {
      getValiduser()
    }
  }, [account])

  // useEffect(() => {
  //   getValiduser()
  // }, [])

  // Fetch user data on component mount
  // useEffect(() => {
  //   getValiduser()
  // }, [])

  // // Sync local account state with global account state
  // useEffect(() => {
  //   setLocalAccount(account) // Sync local state with global state when `account` changes
  // }, [account])

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen}>
            <MenuIcon />
          </IconButton>
          <Drawer open={dropen} onClose={handleclose}>
            <Rightheader logClose={handleclose} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="/logo.png" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your products"
              id=""
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* search filter */}
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.long_title
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink to={`/getDetail/${product.id}`} onClick={()=>setLiopen(true)}>
                        {product.long_title}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/signin">signin</NavLink>
          </div>
          <div className="cart_btn">
            {account?.cart?.length ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.cart.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/signin">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>Cart</p>
          </div>
          {account?.fname ? (
            <Avatar
              className="avatar2"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avatar"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={logoutuser}>
                <LogoutIcon style={{ fontSize: '18px', marginRight: '3px' }} />
                Logout
              </MenuItem>
            ) : (
              ''
            )}
          </Menu>
        </div>
      </nav>
      <ToastContainer />
    </header>
  )
}
export default Navbaar
