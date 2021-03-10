import axios from 'axios';
import { PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
        PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAILED, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAILED, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILED
} from '../actionTypes/productActionTypes';

export const listProducts=()=> async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data}=await axios.get('/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAILED,payload:error.message})
    }
}

export const detailsProduct=(productId)=> async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data}=await axios.get('/api/products/'+productId);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAILED,payload:error.message})
    }
}

export const deleteProduct=(productId)=> async (dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const {userSignIn:{userInfo}}=getState()
        const {data}=await axios.delete('/api/products/'+productId,{
            headers:{
                'Authorization':'Bearer '+userInfo.token
            }
        });
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data,success:true})
    }catch(error){
        dispatch({type:PRODUCT_DELETE_FAILED,payload:error.message})
    }
}

export const saveProduct=(product)=>async(dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
        const {userSignIn:{userInfo}}=getState()
       // console.log("Product Details while updating ",product)
        if(!product._id){
            // console.log('Enter in Post field ', product._id)
            const {data}=await axios.post('/api/products',product,{
                headers:{
                    'Authorization':'Bearer '+userInfo.token
                }
            });
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
        }else{
            console.log('Enter in Put field ', product._id)
            const {data}=await axios.put('/api/products/'+product._id,product,{
                headers:{
                    'Authorization':'Bearer '+userInfo.token
                }
            });
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
        }
        
    }catch(error){
        dispatch({type:PRODUCT_SAVE_FAILED,payload:error.message})
    }
}