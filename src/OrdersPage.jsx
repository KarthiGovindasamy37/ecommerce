import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadOrders,setOrdersError } from './Redux/Reducers/ProductSlice'
import { Link,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

function OrdersPage() {

    const { email } = useSelector(state => state.loginDetails.user)
    const { ordersList,ordersLoading,ordersError } = useSelector(state => state.product)
    const dispatch = useDispatch()

    let navigate = useNavigate()

    useEffect(()=>{
     dispatch(loadOrders(email))
    },[])

    useEffect(()=>{
      if(ordersError){
         navigate("/login")
         dispatch(setOrdersError())
      }
     },[ordersError])
 
    let total = ordersList.reduce((total,ele) => total += Number(ele.price),0)
    
  return (
   
    ordersLoading ?
    <div className="d-flex order-page-empty justify-content-center align-items-center">
      <div className="loading-icons d-flex justify-content-evenly">
        <div class="spinner-grow text-warning" role="status">
       <span class="visually-hidden">Loading...</span>
       </div>
       <div class="spinner-grow text-success" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="spinner-grow text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
          
      </div>
    </div>
    :
    ordersList.length === 0 ?
      <div className='order-page-empty'>
        <div className="empty-order d-flex justify-content-center">
        <div className="empty-order-div"></div>       
        </div>
        <h4 className='text-center text-muted'>It seems like you have not ordered anything yet. Grab a deal</h4>
        <h4 className='text-center text-muted'>and make your first order now...!</h4>
        <div className='text-center pt-2'><Link to='/'><button className='offer-btn'>Diva Offers</button></Link></div>
      </div>
      :
    <div className='orderpage-div'>
        <div className="container-fluid pt-3">
           <div className="table-responsive ms-2">
                <table className="table table-bordered"  width="100%" >
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Date</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                                                      
                        </tr>
                    </thead>
                    <tbody>
                        {
                           ordersList.map((ele,idx) =>{
                            return (
                            <tr className='text-center'>
                                <td>{idx + 1}</td> 
                                <td>{ele.date}</td>
                                <td><Link to={`/view/${ele.collection}/${ele._id}`} className="order-link">{ele.name}</Link></td>
                                <td>{ele.quantity}</td>
                                <td>{ele.price}</td>                            
                            </tr>
                            )
                            })
                            
                            
                        }
                    </tbody>
                        </table>
                        <div className="order-total pe-md-4">
                            <h4>Total = <FontAwesomeIcon icon={faIndianRupeeSign} size="xs"/> {total}</h4>
                        </div>
                        </div>
                        </div>
    </div>

  )
}

export default OrdersPage