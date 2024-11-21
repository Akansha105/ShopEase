import React,{useEffect,useState} from 'react'
const Right = ({item}) => {

  const[price, setPrice] = useState(0)

  useEffect(() => {
    totalAmount()
  }, [item])

  const totalAmount = () => {
    let price = 0
    item.map((i) => {
      const parsedItem = JSON.parse(i)
      price += parsedItem.cost
    })
    setPrice(price)
  }

  return (
    <div className="right_buy">
      <img src="./logo.png" alt="" />
      <div className="cost_right">
        <p>Your order is eligible for free Delivery.</p>
        <br />
        <span style={{ color: '#565959' }}>
          {' '}
          Select this option at checkout.Details
        </span>
        <h3>
          Subtotal({item.length} items): <span style={{ fontWeight: '700' }}>₹{price}.00 </span>
        </h3>
        <button className='rightbuy_btn'>Procees to buy</button>
        <div className='emi'>Emi available</div>
      </div>
    </div>
  )
}
export default Right
