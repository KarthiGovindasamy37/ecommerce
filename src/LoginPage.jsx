import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actionCreator from './Redux/Reducers/LoginSlice'


function LoginPage() {

  let {isLoading,isLoggedin} = useSelector(state => state.loginDetails)
  
  let dispatch = useDispatch()

  let {Login,setLoggedIn } = bindActionCreators(actionCreator,dispatch)

  let navigate = useNavigate()

  useEffect(()=>{
  if(isLoggedin) {
    navigate('/')
    setLoggedIn()
  }  
  },[isLoggedin])
  

    let formik = useFormik({
        initialValues:{
            email:"",
            password:""  
        },

       validate:(values)=>{
            let errors={}

            if(values.email===""){
                errors.email="Please enter email id"
            } 
            if(values.password===""){
                errors.password="Please enter password"
            }
            return errors;
        },
        onSubmit:(values)=>{
          //  loginLoading()
           Login(values)
        }
    })
  return (
    <div className="signup-page">
    <div className='signup-page-div d-flex justify-content-center align-items-center'>
     <div className=" col-11 col-sm-10 col-md-6 col-lg-4">
     <h4 className='text-center'>Don't have an account? <Link to='/signup' className='link'>Sign Up</Link></h4>
     <div className="signup-card px-3 ">
     <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email} />
                    <span style={{color:"red"}}>{formik.errors.email}</span>
                  </div>
                  <div className="mb-3">
                    <label for="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password} />
                    <span style={{color:"red"}}>{formik.errors.password}</span>
                  </div>
                  <div className="d-flex justify-content-end ">
                    <Link to="/forgot" className="link">Forgot password?</Link>
                    
                  </div>
                  <div className='d-flex justify-content-center pb-3 pt-1'>
                    {
                      isLoading ?
                       <button disabled className="btn btn-primary login-btn mt-3 pb-1 pt-2">
                       <div class="spinner-border text-white" style={{height:"20px",width:"20px"}} role="status"></div>
                       </button>
                      :
                      <button disabled={!formik.isValid} className="btn btn-primary login-btn mt-3 " type="submit">Login</button>
                    }
                    
                  </div>
            </form>
            </div>
     </div>
    
    </div>
    </div>
  )
}

export default LoginPage