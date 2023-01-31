import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../../Config";

const initialState = window.localStorage.getItem("cart") ?
{
  cart : JSON.parse(window.localStorage.getItem("cart")),
  buyLoading : false
 } 
 :
{
  cart : {
    cartItems : [],
    total : 0,
    cartQuantity : 0,
  },
    buyLoading : false
}

export const buyProduct = createAsyncThunk("product/buyProduct",async(paymentDetails,{rejectWithValue})=>{
  try {
        let {user,userName,item} = paymentDetails
        let payment=await axios.post(`${env.api}/razorpaypayment`,paymentDetails,{headers : {authorization : window.localStorage.getItem("token")}});
        
        let options={
          key:env.razorpay_key,
          amount:payment.data.amount,
          currency:payment.data.currency,
          name:"Diva",
          description:`Purchasing ${item.name}`,
          image:"https://i.pinimg.com/236x/2e/21/74/2e217401c2876a16f321a0b92ef9c0ac--logo-generator-name-logo.jpg",
          order_id:payment.data.id,
          handler:async(res)=>{
            toast.success(`Payment ID : ${res.razorpay_payment_id}`,{toastId:Math.random()});
            toast.success(`Order ID : ${res.razorpay_order_id}`,{toastId:Math.random()});
  
            let values = {
              response : res,
              user,
              item
            }
            await axios.post(`${env.api}/razorpay/verify`,values)          
        
          },
          prefill:{
            userName,
            email :user,
            contact:"9999999999"
          },
          notes:{
            address:"Diva corporate office"
          },
          theme:{
           color: "#3399cc"
          }
        };
        let paymentWindow = new window.Razorpay(options);
        paymentWindow.on('payment.failed',(response)=>{
        toast.error(response.error.description,{toastId:Math.random()});
        toast.error(response.error.reason,{toastId:Math.random()});
        
      });

      paymentWindow.open();
      
  } catch (error) {
      toast.error(error.response.data.message,{toastId:Math.random()})
      return rejectWithValue(error.response.status)
  }
})

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
      addToCart : (state,action) =>{
        let { cartItems } = state.cart
        if( ! cartItems.some((e)=>e._id === action.payload._id)){
          let item = {...action.payload,quantity:1,totalPrice:action.payload.price}
            cartItems.unshift(item) 
            state.cart.total = state.cart.total + Number(action.payload.price)
            state.cart.cartQuantity = state.cart.cartQuantity + 1
            let cart =state.cart
            window.localStorage.setItem("cart",JSON.stringify(cart))
            toast.success("product added to the cart",{toastId:Math.random()})
        }else{
            toast.error("Product already added in the cart",{toastId:Math.random()})
        }
      },
      qtyIncrement : (state,action) =>{
        let {cartItems} = state.cart
        let index =cartItems.findIndex(e=>e._id === action.payload._id)
        cartItems[index].quantity = action.payload.quantity + 1;
        cartItems[index].totalPrice = cartItems[index].quantity * action.payload.price
        state.cart.total += Number(action.payload.price)
        let cart = state.cart
        window.localStorage.setItem("cart",JSON.stringify(cart))
      },
      qtyDecrement : (state,action) =>{
        let {cartItems} = state.cart
        let index = cartItems.findIndex((e) => e._id === action.payload._id)
        if(cartItems[index].quantity > 1){
        cartItems[index].quantity = action.payload.quantity - 1
        cartItems[index].totalPrice = cartItems[index].quantity * action.payload.price
        state.cart.total -= Number(action.payload.price)
        let cart = state.cart
        window.localStorage.setItem("cart",JSON.stringify(cart))
        }
      },
      removeFromCart : (state,action) =>{
        let {cartItems} = state.cart
        if(cartItems.length > 1){
        let index = cartItems.findIndex((e) => e._id === action.payload._id)
        let removedItem = cartItems.splice(index,1)
        state.cart.total -= (Number(removedItem[0].price) * removedItem[0].quantity)
        state.cart.cartQuantity = state.cart.cartQuantity - 1
        window.localStorage.setItem("cart",JSON.stringify(state.cart))
        }else if(cartItems.length === 1){
            state.cart.cartItems = [];
            state.cart.total = 0;
            state.cart.cartQuantity = 0;
            window.localStorage.removeItem("cart")
        }
        toast.success("product removed from the cart",{toastId:Math.random()})
      }
    },
    extraReducers : (handler) =>{
      handler.addCase(buyProduct.pending,(state)=>{
        state.buyLoading = true
       })
       handler.addCase(buyProduct.fulfilled,(state)=>{
        state.buyLoading = false
       })
       handler.addCase(buyProduct.rejected,(state)=>{
        state.buyLoading = false
       })
    }
})

export const { addToCart,qtyIncrement,qtyDecrement,removeFromCart } = cartSlice.actions

export default cartSlice.reducer