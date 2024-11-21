// import { Select } from '@mui/material';
import React,{useContext} from 'react';
import axios from "axios"
import { LoginContext } from '../../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Option = ({deletedata,get}) => {

    const { setAccount } = useContext(LoginContext)


const removedata = async(req,res)=>{
  try{
    const res = await axios.delete(`/remove/${deletedata}`)
    const data = res.data;
    console.log(data);
    if(res.status === 400 || !data)
    {
      console.log("error");
    }
    else{
      console.log("user deleted");
      setAccount(data); /*check this */
      toast.success('Item removed from cart', {
        position: 'top-center',
      })
      window.location.reload();
      get();
    }
  }catch(err){
    console.log("errorin removing",err);
  }
}

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: 'pointer' }} onClick={() => removedata(deletedata)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia" style={{ cursor: 'pointer' }}>
        Save for Later
      </p>
      <span>|</span>
      <p className="forremovemedia" style={{ cursor: 'pointer' }}>
        See more Like this
      </p>
      <span>|</span>
      <ToastContainer />
    </div>
  )
}
 export default Option