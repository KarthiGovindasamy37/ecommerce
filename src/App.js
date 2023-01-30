import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ForgotPage from './ForgotPage';
import TempPassPage from './TempPassPage';
import ConfirmPassPage from './ConfirmPassPage';
import ViewProduct from './ViewProduct';
import OrdersPage from './OrdersPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='products/:name' element={<ProductsPage/>}/>
        <Route path='cart' element={<CartPage/>}/>
        <Route path='signup' element={<SignupPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='forgot' element={<ForgotPage/>}/>
        <Route path='temp' element={<TempPassPage/>}/>
        <Route path='confirmpass' element={<ConfirmPassPage/>}/>
        <Route path='view/:category/:id' element={<ViewProduct/>}/>
        <Route path='orders' element={<OrdersPage/>}/>
      </Route>    
    </Routes>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </BrowserRouter>
  );
}

export default App;
