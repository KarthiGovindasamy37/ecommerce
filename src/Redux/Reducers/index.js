import { combineReducers } from "redux";
import LoginReducer from "./LoginSlice";
import cartReducer from "./CartSlice";
import productReducer from './ProductSlice'



const reducer = combineReducers({
   
    loginDetails : LoginReducer,
    cart : cartReducer,
    product : productReducer
})

export default reducer
