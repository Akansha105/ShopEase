import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./banner.css";

const data = [
  './15.png',
  './13.png',
  './14.png',
  './19.png',
  './17.png',
  './18.png',
  './20.png',
]

const Banner = () => {
  return (
    <Carousel
      className="carasouel"
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible="true"
      cycleNavigation={true}
      navButtonsProps={{
        style:{
            backgroundColor: "#fff",
            color:"#494949",
            borderRadius:0,
            marginTop:-22,
            height: "104px"
        }
    }}
    >
      {data.map((img, i) => {
        return (
          <>
            <img src={img} alt="" key={i} className="banner_img" />
          </>
        )
      })}
    </Carousel>
  )
}

export default Banner
