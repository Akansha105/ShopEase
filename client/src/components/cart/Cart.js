import { useContext, useEffect, useState } from 'react'
import { Divider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import './cart.css'
import axios from 'axios'
import { LoginContext } from '../../context/ContextProvider'
import CircularProgress from '@mui/material/CircularProgress'
const Cart = () => {
  const { id } = useParams('')
  // console.log(id);

  const history = useNavigate('')
  const { account, setAccount } = useContext(LoginContext)

  const [inddata, setindidata] = useState("")
  console.log(inddata)

  const getindiData = async () => {
    const res = await axios.get(`/getDetail/${id}`)
    const data = res.data[0]
    if (res.status != 201) {
      console.log('no data available')
    } else {
      console.log('getdata')
      setindidata(data)
    }
  }

  useEffect(() => {
    // after 1sec inddata will be called
    setTimeout(getindiData,1000)
  }, [id])

  // to add cart function
  const addToCart = async (id) => {
    const checkres = await axios.post(
      `/addCart/${id}`,
      { inddata },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    const data = checkres.data
    if (data.status === 401 || !data) {
      console.log('user invalid')
      alert('user invalid')
    } else {
      // alert("data added in your cart")
      history('/buynow')
      setAccount(data)
    }
  }

  return (
    <div className="cart_section">
      <div className="cart_container">
        <div className="left_cart">
          <img src={inddata.detail_url} alt="cart_img" />
          <div className="cart_btn">
            <button className="cart_btn1" onClick={() => addToCart(inddata.id)}>
              Add to Cart
            </button>
            <button className="cart_btn2">Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{inddata.short_title}</h3>
          <h4>{inddata.long_title}</h4>
          <Divider />
          <p className="mrp">MRP: ₹{inddata.mrp} </p>
          <p>
            Deal of the day:
            <span style={{ color: '#B12704' }}> ₹{inddata.cost}687</span>
          </p>
          <p>
            You Save: {inddata.mrp - inddata.cost}
            <span style={{ color: '#B12704' }}>({inddata.discount})</span>
          </p>

          <div className="discount_box">
            <h5>
              Discount&nbsp;
              <span style={{ color: '#111' }}>
                extra {inddata.extra_discount}
              </span>
            </h5>
            <h4>
              Free Delivery: &nbsp;
              <span style={{ color: '#111', fontWeight: 600 }}>Oct 8 - 21</span>
              &nbsp;Details
            </h4>
            <p>
              Fastest Delivery: &nbsp;
              <span style={{ color: '#111', fontWeight: 600 }}>
                Tommorow 11AM
              </span>
            </p>
          </div>
          <p className="description">
            About the item:&nbsp;{inddata.description}
            <span
              style={{
                color: '#565959',
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '0.4px',
              }}
            >
              <br />
              {inddata.tagline}
            </span>
          </p>
        </div>
      </div>
      {!inddata ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading..</h2>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default Cart
