import { USER_REGISTER_FAILED, USER_REGISTER_REQUIST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILED, USER_SIGNIN_REQUIST, USER_SIGNIN_SUCCESS } from "../actionTypes/userActionTypes";

export const userSignInReducer=(state={},action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUIST:
            return {loading : true};
        case USER_SIGNIN_SUCCESS:
            return {loading :false,userInfo:action.payload };
        case USER_SIGNIN_FAILED:
            return {loading :false ,error:action.payload};
        default :
            return state;
    }
}

export const userRegisterReducer=(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUIST:
            return {loading : true};
        case USER_REGISTER_SUCCESS:
            return {loading :false,userInfo:action.payload };
        case USER_REGISTER_FAILED:
            return {loading :false ,error:action.payload};
        default :
            return state;
    }
}