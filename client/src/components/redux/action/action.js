import axios from 'axios'
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/getproducts')
    // const res = await data.json()
    console.log(res.data)
    dispatch({ type: 'SUCCESS_GET_PRODUCTS', payload: res.data })
  } catch (error) {
    dispatch({ type: 'FAIL_GET_PRODUCTS', payload: error.response })
  }
}
