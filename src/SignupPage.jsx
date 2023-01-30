import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from './Redux/Reducers/LoginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function SignupPage() {

   const {signupLoading,signupStatus}  = useSelector(state =>state.loginDetails)
   const dispatch = useDispatch()
    
    
    let navigate=useNavigate()

    useEffect(() =>{
     if(signupStatus) navigate("/")
    },[signupStatus])

    let formik=useFormik({
      initialValues:{
        name:"",
        email:"",
        password:"",
        confirmpass:"",
        orders : []
      },
      validate:(values)=>{
        let errors={}
         
        if(values.name===""){
          errors.name="Please enter user name"
        }
        if(values.email===""){
          errors.email="Please enter email id"
        }
        if(values.password===""){
          errors.password="Please enter password"
        }
        if(values.password.length > 0 && values.password.length < 5){
          errors.password="Password must be atleast 5 characters long"
        }
        if(values.confirmpass===""){
          errors.confirmpass="Please re enter password"
        }
        if(values.confirmpass.length > 0 && values.password !== values.confirmpass){
          errors.confirmpass="Password does not match"
        }
        
        return errors;
      },
      onSubmit:async(values)=>{
       dispatch(signup(values))
      }
    })
  return (
    <div className='signup-page'>
     <div className='signup-page-div1 d-flex justify-content-center align-items-center'>
     <div className=" col-11 col-sm-10 col-md-6 col-lg-4 ">
        <h4 className='text-center pb-2 pt-4'>Already have an account? <Link to='/login' className='link'>Login</Link></h4>
     <div className="signup-card px-3">
     <form onSubmit={formik.handleSubmit}>
           <div className="mb-3 mt-2">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name} />
                <span style={{color:"red"}}>{formik.errors.name}</span>
              </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email ID</label>
                <input type="email" className="form-control" id="email"
                name="email"
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
              <div className="mb-3">
                <label for="confirmpass" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmpass"
                name="confirmpass"
                onChange={formik.handleChange}
                value={formik.values.confirmpass} />
                <span style={{color:"red"}}>{formik.errors.confirmpass}</span>
              </div>
              
              <div className="d-flex justify-content-center mt-4 mb-3">
                {
                signupLoading ?
                <button disabled className="btn btn-primary signupbtn pb-1 pt-2">
                <div class="spinner-border text-white" style={{height:"20px",width:"20px"}} role="status"></div>
                </button>
               :      
                <button disabled={!formik.isValid} className="btn btn-primary signupbtn" type="submit">Sign Up</button>
              }
              </div>

        </form>
   </div>
   </div>
   </div>
    </div>
  )
}

export default SignupPage