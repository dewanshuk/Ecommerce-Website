import React,{useState,useEffect  } from "react";
import { BrowserRouter, Route, Link ,HashRouter as Router} from "react-router-dom";
// import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import { Button, Input } from "@chakra-ui/react";
import { openUrl } from "./utils/utils";
import ErrorScreen from "./components/ErrorScreen";
import {FaShoppingCart} from "react-icons/fa"
import {FaUserCircle} from "react-icons/fa"
import {FaSignInAlt} from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import logoA from "./assets/a_logo_new.png"
import logoA2 from "./assets/logo_akshay2.jpg"
import { cilCart,cilHamburgerMenu, cilSearch } from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import { CiFacebook,CiMail,CiLinkedin,CiPhone  } from "react-icons/ci";
import './App.css';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { api } from "./service";
const stripePromise = loadStripe(process.env.REACT_APP_FE_STRIPE_TEST_KEY)

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
      const fetchData = async()=>{
      let res = await  api.post(`${process.env.REACT_APP_FE_URL}/create-payment-intent`,JSON.stringify({items:[{id:'xl-shirt'}]}),{
        headers:{
          'Content-Type':'application/json'
        }

      })
      console.log(res)
      const r =  res.data.clientSecret;
      setClientSecret(r);
    }
    fetchData()
    // fetch(`${api}/create-payment-intent`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    //   .then((res) => res.json())
    //   .then((data) =>console.log(data))
    //   .catch(err=>console.log(err))
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <>
    
      
    
    <BrowserRouter>
          <Router>

      <div className=" w-screen overflow-hidden bg-gray-300 shadow-xl">
        <header className="mx-6 flex flex-row justify-between items-center   sticky top-0 z-50  h-16">
          <div className=" w-36 flex flex-row items-center justify-around ">
            {/* <button onClick={openMenu} className="bg-black"> */}
              <CIcon icon={cilHamburgerMenu} onClick={openMenu} width={35}/>
            {/* </button> */}
            <Link to="/"><img src = {logoA} alt = "logo" className="" width={100} /></Link>
          </div>
          <div className="w-[30%] relative">
          <Input placeholder='Search here'  className='search-input' />
          <CIcon icon={cilSearch} className="search-icon" />
          </div>
          <div className=" w-48 flex flex-row justify-around items-center">
            {/* <a href="cart.html" className="">Cart</a> */}
              <Link to= "" className = 'flex flex-col justify-center items-center gap-y-1 ' >
                <CIcon icon = {cilCart} size="sm" title="cart" width={25}/>
              </Link>
            {userInfo ? (
              <Link to="/profile" className  = 'flex flex-col justify-center items-center gap-y-1'>
                  <FaUserCircle fontSize={30}/>
                  <p className="text-sm">Profile</p>
              </Link>
            ) : (
              <Link to="/signin" className= 'flex flex-col justify-center items-center gap-y-1 '>
                  <Button style={{background:"black",color:'white'}}>Login</Button>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>

            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main overflow-x-hidden">
          {/* background-color: #fcdcdb; background-image: linear-gradient(118deg,
          #fcdcdb 0%, #f0ecfc 100%); */}
          <div className="bg-gradient-to-b from-gray-100 to-gray-50 ">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            {
              clientSecret && (
                <Elements options={options} stripe={stripePromise}>
              <Route path="/checkout/" component={CheckoutForm} />
              </Elements>)
            }

            <Route path="/" exact={true} component={HomeScreen} />

            <Route path = '/error' component = {ErrorScreen} />

            
          </div>
          <footer className="w-screen h-40  mt-12 bg-[#e7e7e7]  shadow-lg  bottom-0 flex flex-col justify-around items-center">
            <div className="footer-socials flex flex-row justify-center items-center gap-x-12">
              <CiLinkedin fontSize={35} />
              <CiMail fontSize={35}/>
              <CiPhone fontSize={35}/>
              <CiFacebook fontSize={35}/>
            </div>
            <div>
              All rights reserved
            </div>
            
          </footer>
        </main>
      </div>
          </Router>       
    </BrowserRouter>
    </>
  );
}

export default App;
