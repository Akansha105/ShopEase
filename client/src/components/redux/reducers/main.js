// this file is used  when we have multiple reducer function,so we create a combined reducer(obj ke andar saree reducer funcn ko add kr denge)

import { getProductsreducer } from "./Productsreducer";

// import {combinedReducers} from "redux";
import { combineReducers } from '@reduxjs/toolkit'

//Calling of all reducer function;
const rootreducers = combineReducers({
  getproductsdata: getProductsreducer,
})

export default rootreducers;