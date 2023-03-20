import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { env } from "../../Config";

const initialState = {
    dealsItems:[],
    divaItems:[],
    productsList:[],
    productLoading:false,
    productError:false,
    filteredItems:[],
    viewLoading:false,
    viewItem:{},
    ordersLoading:false,
    ordersError:false,
    ordersList:[],
    searchList:[],
    categoryList:[],
    dropView:false,
    dropViewClose:false,
    filterMinValue:1,
    filterMaxValue:800,
    filterBlock:false,
    filterLoading:false,
    filterError:false,
    productSearchValue:"",
    productSearchAlert:false,
    searchFilteredItems:[],
    searchFilterBlock:false,
    searchBlock:false,
    searchLoading:false,
    navSearchValue:"",
    navSearchAlert:false
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

export const filter = createAsyncThunk("product/filter", async (value,{getState,rejectWithValue}) =>{
try {
    const {filterMinValue,filterMaxValue} = getState().product

    let filteredItems = await axios.get(`${env.api}/filter/${value}?min=${filterMinValue}&max=${filterMaxValue}`)
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

export const searchProduct = createAsyncThunk("product/searchProduct",async(value,{getState,rejectWithValue})=>{
    try {
        const {productSearchValue} = getState().product
        
        let products = await axios.get(`${env.api}/search/${value}/${productSearchValue}`)

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
        productSearchClear : (state) =>{
        state.productSearchValue = ""
        state.productSearchAlert = false
        state.filterBlock = false
        state.searchBlock = false
        state.searchList = []
        state.searchFilterBlock = false
       },
       setDropView : (state) =>{
        state.dropView = !state.dropView
       },
       navSearchClear : (state) =>{
        state.categoryList = []
        state.navSearchValue =""
        state.navSearchAlert = false
       },
       setOrdersError : (state) =>{
        state.ordersError = false
       },
       setDropViewClose : (state,{payload}) =>{
        state.dropViewClose = payload
       },
       setFilterMinValue : (state,{payload}) =>{
        state.filterMinValue = payload
       },
       setFilterMaxValue : (state,{payload}) =>{
        state.filterMaxValue = payload
       },
       setProductSearchValue : (state,{payload}) =>{
        state.productSearchValue = payload
       },
       setProductSearchAlert : (state,{payload}) =>{
        state.productSearchAlert = payload
       },
       setNavSearchValue : (state,{payload}) =>{
        state.navSearchValue = payload
        state.categoryList = []
       },
       setNavSearchAlert : (state,{payload}) =>{
        state.navSearchAlert = payload
       },
       setSearchFilteredItems : (state,{payload}) =>{
        state.searchBlock = false
        state.searchFilterBlock = true
        state.searchFilteredItems = payload
       },
       setSearchBlock : (state) =>{
        state.searchBlock = false
        state.searchList = []
       }
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
        state.filterBlock = false
        state.searchBlock = false
        state.productError = false
        state.searchFilterBlock = false
        state.productSearchValue = ""
        state.searchList = []
       })
       handler.addCase(productList.fulfilled,(state,{payload}) =>{
        state.productsList = payload
        state.productLoading = false
       })
       handler.addCase(productList.rejected,(state) =>{
        state.productLoading = false
        state.productError = true
       })
       handler.addCase(filter.pending,(state) =>{
        state.filterBlock = true
        state.filterLoading = true
        state.filterError = false
       })
       handler.addCase(filter.fulfilled,(state,{payload}) =>{
        state.filteredItems = payload
        state.filterLoading = false
       })
       handler.addCase(filter.rejected,(state) =>{
        state.filterLoading = false
        state.filterError = true
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
       handler.addCase(searchProduct.pending,(state) =>{
        state.filterBlock = false
        state.searchBlock = true
        state.searchLoading = true
        state.searchError = false
        state.searchFilterBlock = false
       })
       handler.addCase(searchProduct.fulfilled,(state,{payload})=>{
        state.searchLoading = false
        state.searchList = payload
       })
       handler.addCase(searchProduct.rejected,(state) =>{
        state.searchLoading = false
        state.searchError = true
       })
       handler.addCase(loadCategories.fulfilled,(state,{payload}) =>{
        state.categoryList = payload
       })
       
    }
})

export const {productSearchClear,setDropView,navSearchClear,setOrdersError,
    setDropViewClose,setFilterMinValue,setFilterMaxValue,
    setProductSearchValue,setProductSearchAlert,setNavSearchValue,
    setNavSearchAlert,setSearchFilteredItems,setSearchBlock} = productSlice.actions

export default productSlice.reducer

