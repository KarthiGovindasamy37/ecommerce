import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPass } from './Redux/Reducers/LoginSlice'

function ForgotPage() {

  const { forgotLoading } = useSelector(state => state.loinDetails)
  const dispatch = useDispatch()

    let formik=useFormik({
        initialValues:{
          email:""
        },
        validate:(values)=>{
          let errors={}
    
          if(values.email===""){
            errors.email="Please enter email address"
          }
          if(values.email.length > 0){
            let regex = new RegExp(/^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
            if(!regex.test(values.email)) errors.email = "Please enter a valid email address"
        }
    
          return errors;
        },
        onSubmit:async(values)=>{
          dispatch(forgotPass(values))
        }
      })
  return (
    <div className='signup-page'>
   <div className='signup-page-div d-flex justify-content-center align-items-center'>
     <div className="signup-card px-3 col-11 col-sm-10 col-md-6 col-lg-4">
     <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email} />
                        <span style={{color:"red"}}>{formik.errors.email}</span>
                      </div>
                      <div className="d-flex justify-content-center mt-4 mb-3">
                        {
                          forgotLoading ?
                          <button disabled className="btn btn-primary signupbtn pb-1 pt-2">
                          <div class="spinner-border text-white" style={{height:"20px",width:"20px"}} role="status"></div>
                          </button>
                         :      
                        <button disabled={!formik.isValid} className="btn btn-primary signupbtn" type="submit">Submit</button>
                        }
                        </div>
                      <div className="d-flex justify-content-end pb-3">
                        <Link  to="/temp" className='link'>Temporary Password</Link>
                      </div>
                      
                      </form>
     </div>
   </div>

    </div>
  )
}

export default ForgotPage