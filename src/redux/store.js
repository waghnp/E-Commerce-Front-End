import  {createStore,combineReducers,compose, applyMiddleware} from 'redux';
import {productListReducer,productDetailsReducer, productSaveReducer, productDeleteReducer} from './reducers/productListReducer';
import {cartReducer} from './reducers/cartReducers';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';
import { userRegisterReducer, userSignInReducer } from './reducers/userReducers';

const cartItems=Cookie.getJSON("cartItems") || [];
const userInfo=Cookie.getJSON("userInfo") || null;
 
const initialState={cart:{cartItems},userSignIn:{userInfo}};
const reducer=combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart:cartReducer,
    userSignIn:userSignInReducer,
    userRegister:userRegisterReducer,
    productSave:productSaveReducer,
    productDelete:productDeleteReducer
})
const store=createStore(reducer,initialState,compose(applyMiddleware(thunk)))

export default store;