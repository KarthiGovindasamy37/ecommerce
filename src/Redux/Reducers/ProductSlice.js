import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../../Config";

const initialState = {
    dealsItems:[],
    divaItems:[],
    productsList:[],
    productLoading:false,
    filteredItems:[],
    viewLoading:false,
    viewItem:{},
    ordersLoading:false,
    ordersError:false,
    ordersList:[],
    searchList:[],
    categoryList:[],
    dropView:false
}

export const loadDeals = createAsyncThunk("product/loadDeals", async(obj,{rejectWithValue}) =>{
    try {
        let items = await axios.get(`${env.api}/dealsimages`)

        return(items.data)
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
    }
})

export const loadDiva = createAsyncThunk("product/loadDiva",async(obj,{rejectWithValue}) =>{
    try {
        let items = await axios.get(`${env.api}/divablock`)

        return(items.data)
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
    }
})

export const productList = createAsyncThunk("product/productList", async(category,{rejectWithValue}) => {
    try {
        let items = await axios.get(`${env.api}/products/${category}`) 
        return items.data
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
    }
})

export const filter = createAsyncThunk("product/filter", async (values,{rejectWithValue}) =>{
try {
    let filteredItems = await axios.get(`${env.api}/filter/${values.name}?min=${values.minValue}&max=${values.maxValue}`)
    return filteredItems.data
} catch (error) {
    toast.error(error.response.data.message,{toastId:Math.random()})
    return rejectWithValue(error.response.status)
}
})

export const viewProduct = createAsyncThunk("product/viewProduct", async (value,{rejectWithValue}) =>{
try {
    
    let item = await axios.get(`${env.api}/viewproduct/${value.category}/${value.id}`)
    return item.data
} catch (error) {
    toast.error(error.response.data.message,{toastId:Math.random()})
    return rejectWithValue(error.response.status)
}
})

export const loadOrders = createAsyncThunk("product/loadOrders",async(email,{rejectWithValue}) =>{
    try {
        let user = await axios.get(`${env.api}/users?email=${email}`,{headers :{Authorization : window.localStorage.getItem("token")}})
        
         return user.data
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status) 
    }
})

export const searchProduct = createAsyncThunk("product/searchProduct",async(value,{rejectWithValue})=>{
    try {
        let products = await axios.get(`${env.api}/search/${value.name}/${value.searchValue}`)

        return products.data
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
    }
})

export const loadCategories = createAsyncThunk("product/loadCategories",async(value,{rejectWithValue}) =>{
    try {
        let items = await axios.get(`${env.api}/itemlist/${value}`)
        return items.data
    } catch (error) {
        toast.error(error.response.data.message,{toastId:Math.random()})
        return rejectWithValue(error.response.status)
    }
})



const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
       setSearchList : (state) =>{
        state.searchList = []
       },
       setDropView : (state) =>{
        state.dropView = !state.dropView
       },
       setCategoryList : (state) =>{
        state.categoryList = []
       },
       setOrdersError : (state) =>{
        state.ordersError = false
       },
    },
    extraReducers : (handler) =>{
       handler.addCase(loadDeals.fulfilled,(state,{payload}) =>{
        state.dealsItems = payload
       })
       handler.addCase(loadDiva.fulfilled,(state,{payload}) =>{
        state.divaItems = payload
       })
       handler.addCase(productList.pending,(state) =>{
        state.productLoading = true
       })
       handler.addCase(productList.fulfilled,(state,{payload}) =>{
        state.productsList = payload
        state.productLoading = false
       })
       handler.addCase(productList.rejected,(state) =>{
        state.productLoading = false
       })
       handler.addCase(filter.pending,(state) =>{
        state.productLoading = true
       })
       handler.addCase(filter.fulfilled,(state,{payload}) =>{
        state.productsList = payload
        state.productLoading = false
       })
       handler.addCase(filter.rejected,(state) =>{
        state.productLoading = false
       })
       handler.addCase(viewProduct.pending,(state) =>{
        state.viewLoading = true
       })
       handler.addCase(viewProduct.fulfilled,(state,{payload}) =>{
        state.viewItem = payload
        state.viewLoading = false
       })
       handler.addCase(viewProduct.rejected,(state) =>{
        state.viewLoading = false
       })
       handler.addCase(loadOrders.pending,(state)=>{
        state.ordersLoading = true
       })
       handler.addCase(loadOrders.fulfilled,(state,{payload})=>{
        state.ordersLoading = false
        state.ordersList = payload
       })
       handler.addCase(loadOrders.rejected,(state,{payload})=>{
        state.ordersLoading = false
        if(payload === 440 || payload === 401) state.ordersError = true
       })
       handler.addCase(searchProduct.fulfilled,(state,{payload})=>{
        state.searchList = payload
       })
       handler.addCase(loadCategories.fulfilled,(state,{payload}) =>{
        state.categoryList = payload
       })
       
    }
})

export const {setSearchList,setDropView,setCategoryList,setOrdersError} = productSlice.actions

export default productSlice.reducer

