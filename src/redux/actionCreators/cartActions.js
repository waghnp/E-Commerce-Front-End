import axios from "axios";
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes/cartActionTypes";

export const addToCart=(productId,qty)=>async (dispatch,getState)=>{
    try{
        const {data}= await axios.get("/api/products/"+productId);
        dispatch({type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            name:data.name,
            catagory:data.catagory,
            image:data.image,
            brand:data.brand,
            price:data.price,
            rating:data.rating,
            numReviews:data.numReviews,
            countInStock:data.countInStock,
            qty:qty
        }});
        const {cart:{cartItems} }=getState();
        Cookie.set('cartItems',JSON.stringify(cartItems));
    }catch(error){

    }
}

export const removeFromCart=(productId)=>(dispatch,getState)=>{
    dispatch({type:CART_REMOVE_ITEM,payload:productId})
    const {cart:{cartItems} }=getState();
    Cookie.set('cartItems',JSON.stringify(cartItems));
}