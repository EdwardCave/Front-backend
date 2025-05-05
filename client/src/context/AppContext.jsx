import { createContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.VITE_CuRRENCY
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);

    const [cartItems,setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState({});
     
const fetchSeller = async () => {
  try {
    const {data} = await axios.get("/api/seller/is-auth")
    if(data.success){
      setIsSeller(true)
    }else {
      setIsSeller(false)
    }
  } catch (error) {
    setIsSeller(false)
  }
}

const fetchUser = async () =>{
  try {
    const {data} = await axios.get("/api/user/is-auth")
    if(data.success){
      setUser(data.user)
      setCartItems(data.user.cartItems)
    }
  } catch (error) {
    setUser(null)
  }
}

    // fectch All Products
    const fetchProducts = async ()=>{
      try{
        const {data} = await axios.get("/api/product/list")
        if(data.success){
          setProducts(data.products)
        }else {
          toast.error(data.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    }

  // Add Product to Cart
  const addToCart = (itemId) => { 
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] += 1;
    }else {
      cartData[itemId] = 1
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
   }

   // update Cart Item Quantity
    const updateCartItem = (itemId,quantity) => {
      let cartData = structuredClone(cartItems);
  
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Item quantity updated");
    
    }

    // Remove Product from Cart

    const removeFromCart = (itemId) => {
      let cartData = structuredClone(cartItems);
      if(cartData[itemId]){
         cartData[itemId] -= 1;
         if(cartData[itemId] === 0){
          delete cartData[itemId];
         }
        
      }
      setCartItems(cartData);
        toast.success("Item removed from cart");
    }



    // Get cart Item Count
    const getCartCount = () =>{
      let totalCount = 0
      for(const item in cartItems){
        totalCount += cartItems[item];
      }
      return totalCount;
    }

    // Get Cart Total Amount
    const getCartAmount = () =>{
      let totalAmount = 0; 
      for(const item in cartItems){
        let itemInfo = products.find((product) => product._id === item);
       
        if(cartItems[item] > 0){
          totalAmount += cartItems[item] * itemInfo.offerPrice;
        }
       
      }
      return Math.floor(totalAmount*100)/100;
    }
    useEffect(()=>{
      fetchSeller();
      fetchUser()
      fetchProducts();
    },[])

    useEffect(()=>{
      const updateCart = async () =>{
        try {
          const { data } = await axios.post("/api/cart/update",{
            cartItems
          })
          if(!data.success){
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }

      if(user){
        updateCart()
      }
        }
      , [cartItems])
    


    const value = { 
      navigate,
      user,
      setUser,
      isSeller,
      setIsSeller,
      showUserLogin,
      setShowUserLogin,
      products,
      currency,
      addToCart,
      updateCartItem,
      removeFromCart,
      cartItems,
      searchQuery,
      setSearchQuery,
      getCartAmount,
      getCartCount,
      axios,
      fetchProducts,
      setCartItems
    };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => {
  return React.useContext(AppContext);
};