import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tempPassword } from "./Redux/Reducers/LoginSlice";

function TempPassPage() {

  const {tempLoading,tempStatus} = useSelector(state =>state.loginDetails)
  const dispatch = useDispatch()

  let navigate = useNavigate();

  useEffect(() =>{
    if(tempStatus) navigate("/confirmpass")
  },[tempStatus])

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};

      if (values.email === "") {
        errors.email = "Please enter email address";
      }
      if (values.password === "") {
        errors.password = "Please enter temporary password";
      }

      return errors;
    },
    onSubmit: async (values) => {
      dispatch(tempPassword(values))
    },
  });
  return (
    <div className="signup-page">
      <div className="signup-page-div d-flex justify-content-center align-items-center">
        <div className="col-11 col-sm-10 col-md-6 col-lg-4">
          <div className="signup-card px-3 ">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 mt-3">
                <label for="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              </div>
              <div className="mb-3">
                <label for="pass" className="form-label">
                  Temporary Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pass"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <span style={{ color: "red" }}>{formik.errors.password}</span>
              </div>

              <div className="d-flex justify-content-center mt-5 mb-3">
                { 
                tempLoading ? 
                  <button
                    disabled
                    className="btn btn-primary signupbtn pb-1 pt-2"
                  >
                    <div
                      class="spinner-border text-white"
                      style={{ height: "20px", width: "20px" }}
                      role="status"
                    ></div>
                  </button>
                 : 
                  <button
                    disabled={!formik.isValid}
                    className="btn btn-primary signupbtn"
                    type="submit"
                  >
                    Submit
                  </button>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempPassPage;
