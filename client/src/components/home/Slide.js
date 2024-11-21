import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Divider } from '@mui/material'
// import { products } from './productData'

import "./slide.css"
import { NavLink } from 'react-router-dom'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const Slide = ({title,products}) => {
  return (
    <div className="products_section">
      <div className="products_deal">
        <h3>{title}</h3>
        <button className="view_btn">View All</button>
      </div>
      <Divider />

      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        showDots={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((m) => {
          return (
            <NavLink to={`/getDetail/${m.id}`}>
              <div className="products_items">
                <div className="products_image">
                  <img src={m.url} alt="productItem" />
                </div>
                <p className="products_name">{m.short_title}</p>
                <p className="products_offer">{m.extra_discount}</p>
                <p className="products_explore">{m.tagline}</p>
              </div>
            </NavLink>
          )
        })}
      </Carousel>
    </div>
  )
}
export default Slide
