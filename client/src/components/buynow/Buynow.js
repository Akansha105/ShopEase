import React,{useState,useEffect} from "react"
import { Divider } from '@mui/material'
import Option from "./Option"
import Subtotal from "./Subtotal"
import Right from "./Right"
import axios from "axios";
import "./buynow.css"


const Buynow = () => {

  const [cartdata,setcartdata] = useState("");
  // console.log(cartdata.cart)

  const getdatabuy = async() =>{
    try{
    const res = await axios.get('/cartdetails');
    const data = res.data;
    // console.log(JSON.stringify(data).cart +" data");
    if(res.status !== 201)
    {
      console.log("error");
    }
    else{
      setcartdata(data.cart);
    }
  }
  catch(err)
  {
    console.log(err)
  }
  };
  useEffect(()=>{
    getdatabuy();
  },[])

  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select All Item</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartdata.map((d, k) => {
                const parsedItem = JSON.parse(d)
                return (
                  <>
                    <div className="item_containert">
                      <img src={parsedItem.detail_url} alt="" />
                      <div className="item_details">
                        <h3>{parsedItem.short_title}</h3>
                        <h4>{parsedItem.long_title}</h4>
                        <h3 className="differentprice">₹{parsedItem.mrp}</h3>
                        <p className="unusuall">Usually dispatch in 8 days</p>
                        <p>Eligible for FREE Shipping</p>
                        {/* <img src="" alt="" /> */}
                        <Option deletedata={parsedItem.id} get={getdatabuy}/>
                      </div>
                      <h3 className="item_price">₹{parsedItem.cost}</h3>
                    </div>
                    <Divider />
                  </>
                )
              })}

              <Subtotal item={cartdata} />
            </div>
            <Right item={cartdata} />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default Buynow