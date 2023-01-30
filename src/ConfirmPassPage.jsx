import { useFormik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetPass } from './Redux/Reducers/LoginSlice'

function ConfirmPassPage() {

    const { resetLoading,resetStatus } = useSelector(state => state.loginDetails)
    const dispatch = useDispatch()

    let navigate=useNavigate()
    
    useEffect(() =>{
     if(resetStatus) navigate("/")
    },[resetStatus])

    let formik=useFormik({
        initialValues:{
            email:"",
            password:"",
            confirm:""
        },
        validate:(values)=>{
            let errors={}

            if(values.email===""){
                errors.email="Please enter email id"
            }
            if(values.password===""){
                errors.password="Please enter password"
            }
            if(values.password.length>0 && values.password.length<5){
                errors.password="Password must be atleast 5 characters long"
            }
            if(values.confirm===""){
                errors.confirm="Please re enter password"
            }
            if(values.confirm.length > 0 && values.password !== values.confirm){
                errors.confirm="Password does not match"
            }

            return errors;

        },
        onSubmit:async(values)=>{
          dispatch(resetPass(values))
        }
    })
  return (
    <div className='signup-page'>
        <div className='signup-page-div d-flex justify-content-center align-items-center'>
     <div className="col-11 col-sm-10 col-md-6 col-lg-4">
      <div className="signup-card px-3 ">
      <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Email ID</label>
                        <input type="email" className="form-control" id="email" 
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}/>
                        <span style={{color:"red"}}>{formik.errors.email}</span>
                      </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" 
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}/>
                        <span style={{color:"red"}}>{formik.errors.password}</span>
                      </div>
                      <div className="mb-3">
                        <label for="pass" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="pass" 
                        name="confirm"
                        onChange={formik.handleChange}
                        value={formik.values.confirm}/>
                        <span style={{color:"red"}}>{formik.errors.confirm}</span>
                      </div>
                      
                      <div className="d-flex justify-content-center mt-5 mb-3">
                        {
                            resetLoading ?
                            <button disabled className="btn btn-primary signupbtn pb-1 pt-2">
                            <div class="spinner-border text-white" style={{height:"20px",width:"20px"}} role="status"></div>
                            </button>
                           : 
                        <button disabled={!formik.isValid} className="btn btn-primary signupbtn" type="submit">Submit</button>
                        }
                        </div>

                </form>
      </div>
      </div>
      </div>
      </div>
  )
}

export default ConfirmPassPage