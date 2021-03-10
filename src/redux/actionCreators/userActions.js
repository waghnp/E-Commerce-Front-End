import { USER_REGISTER_FAILED, USER_REGISTER_REQUIST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_REQUIST, USER_SIGNIN_SUCCESS } from "../actionTypes/userActionTypes"
import Axios from 'axios';
import Cookie from 'js-cookie';

export const signIn=(email,password)=> async (dispatch)=>{
    dispatch({type:USER_SIGNIN_REQUIST})
    try{
        const {data} = await Axios.post("/api/users/signin",{email,password})
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        Cookie.set("userInfo",JSON.stringify(data));
    }catch(error){
        dispatch({type:USER_SIGNIN_FAILED,payload:error.message})
    }
}

export const register=(name,email,password)=> async (dispatch)=>{
    dispatch({type:USER_REGISTER_REQUIST})
    try{
        const {data} = await Axios.post("/api/users/register",{name,email,password})
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        Cookie.set("userInfo",JSON.stringify(data));
    }catch(error){
        dispatch({type:USER_REGISTER_FAILED,payload:error.message})
    }
}