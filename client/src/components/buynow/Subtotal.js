import React, { useState,useEffect } from "react";
const Subtotal = ({item}) => {

const [price,setPrice] = useState(0);

  useEffect(()=>{
    totalAmount();
  },[item])

  const totalAmount = () =>{
    let price = 0
    item.map((i)=>{
      const parsedItem = JSON.parse(i)
      price += parsedItem.cost;
    })
    setPrice(price);
  }
 
  return (
    <div className="sub_item">
      <h3>SubTotal({item.length} items): <strong style={{fontWeight:"700", color: "#111"}}>₹{price}.00</strong></h3>
    </div>
  )
}
export default Subtotal;