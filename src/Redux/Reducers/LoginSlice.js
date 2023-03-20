import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from '../../Config'

const initialState = window.localStorage.getItem("userDetails") !== null ?
{user: JSON.parse(window.localStorage.getItem("userDetails")),
 isLoading:false,
isLoggedin:false,
isLoggedOut:false,
signupLoading:false,
signupStatus:false,
tempLoading:false,
tempStatus:false,
resetLoading:false,
resetStatus:false,
forgotLoading:false          
} :
{
    isLoading:false,
    isLoggedin:false,
    isLoggedOut:false,
    signupLoading:false,
    signupStatus:false,
    tempLoading:false,
    tempStatus:false,
    resetLoading:false,
    resetStatus:false,
    forgotLoading:false, 
    user:{
        userName:"",
        email:"",
    }
}

export const signup = createAsyncThunk("login/signup",async(values,{rejectWithValue}) =>{
    try {
        delete values.confirmpass
        let user=await axios.post(`${env.api}/signup`,values)
        if(user.status===200){
          toast.success(user.data.message,{toastId:Math.random()})
        }
      } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
      }
})


export const Login = createAsyncThunk("login/Login", async (values,{rejectWithValue}) => {
  try{
    let user = await axios.post(`${env.api}/login`,values)
    window.localStorage.setItem("token",user.data.token)
    let userDetails = {
        userName : user.data.user.name,
        email : user.data.user.email
    }
    window.localStorage.setItem("userDetails",JSON.stringify(userDetails))
    toast.success("User logged in successfully",{toastId:Math.random()})
    return user.data.user
    }catch(error){
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response)
    }
    
})

export const forgotPass = createAsyncThunk("login/forgotPass",async(value,{rejectWithValue}) =>{
    try {
        let user=await axios.post(`${env.api}/forgot`,value)
        
        if(user.status===200){
          toast.success(user.data.message,{toastId:Math.random()})
          return user.data
        }
      } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
      }
    })


export const tempPassword = createAsyncThunk("login/tempPassword",async(values,{rejectWithValue}) =>{
    try {
        
        values.password = values.password.trim();

        let user = await axios.post(`${env.api}/temporarypass`, values);
       if (user.status === 200) {
          toast.info(user.data.message, { toastId: Math.random() });
          return user.data
        }
      } catch (error) {
        toast.error(error.response.data.message, { toastId: Math.random() });
        return rejectWithValue(error.response.status)
      }
})

export const resetPass = createAsyncThunk("login/resetPass",async(values,{rejectWithValue}) =>{
    try {
        delete values.confirm
        let password=await axios.post(`${env.api}/resetpass`,values)

        if(password.status===200){
            toast.success(password.data.message,{toastId:Math.random()})
            return password.data
        }
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
    }
})


const loginSlice = createSlice({
    name : "login",
    initialState,
    reducers : {
       logout : (state) =>{
        if(window.localStorage.getItem("userDetails")){
        state.user.userName = ""
        state.user.email = ""
        state.isLoggedOut = true
        window.localStorage.removeItem("userDetails")
        window.localStorage.removeItem("token")
        }else{
            toast.error("No user has logged in",{toastId:Math.random()})
        }
       },
       setLoggedIn : (state) =>{
        state.isLoggedin = false
       }
    },
    extraReducers: (builder) =>{

        builder.addCase(Login.pending,(state) =>{
            state.isLoading = true
        })

        builder.addCase(Login.fulfilled,(state,action) =>{
            state.isLoggedOut = false
            state.isLoggedin = true
            state.user = action.payload
            state.isLoading = false            
        })

        builder.addCase(Login.rejected,(state,action) =>{
            state.isLoading = false
        })

        builder.addCase(signup.pending,(state) =>{
            state.signupLoading = true
        })
        builder.addCase(signup.fulfilled,(state) =>{
            state.signupLoading = false
            state.signupStatus = true
        })
        builder.addCase(signup.rejected,(state) =>{
            state.signupLoading = false
        })
        builder.addCase(tempPassword.pending,(state) =>{
            state.tempLoading = true
        })
        builder.addCase(tempPassword.fulfilled,(state) =>{
            state.tempLoading = false
            state.tempStatus = true
        })
        builder.addCase(tempPassword.rejected,(state) =>{
            state.tempLoading = false
        })
        builder.addCase(resetPass.pending,(state) =>{
            state.resetLoading = true
        })
        builder.addCase(resetPass.fulfilled,(state) =>{
            state.resetLoading = false
            state.resetStatus = true
        })
        builder.addCase(resetPass.rejected,(state) =>{
            state.resetLoading = false
        })
        builder.addCase(forgotPass.pending,(state) =>{
            state.forgotLoading = true
        })
        builder.addCase(forgotPass.fulfilled,(state) =>{
            state.forgotLoading = false
        })
        builder.addCase(forgotPass.rejected,(state) =>{
            state.forgotLoading = false
        })
       
     }
})

export const {logout,setLoggedIn} = loginSlice.actions
export default loginSlice.reducer