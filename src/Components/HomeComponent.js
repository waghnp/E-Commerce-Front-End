import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {listProducts} from '../redux/actionCreators/productActions';

const Home=()=>{

// const state=useSelector(state=>state);
// console.log(state)
const productList = useSelector(state => state.productList)
const {loading,products,error}=productList;
const dispatch = useDispatch();

  useEffect(() => {
      dispatch(listProducts());
      return () => {
        
      }
  }, [])
    return(
        loading? <div>Loading...</div> :
        error? <div>{error}</div> :
        <>
           <ul className="products">
                      {products.map(product=>
                             <li className="product" key={product._id}>
                             <Link to={'/product/'+product._id}>
                                <img className="product-image" src={product.image} alt="product"/>
                             </Link> 
                             <div className="product-name"> <Link to={'/product/'+product._id} >{product.name}</Link></div>
                             <div className="product-brand">{product.brand}</div>
                             <div className="product-price">${product.price}</div>
                             <div className="product-rating">{product.rating} stars ({product.numReviews} reviews)</div>
                         </li> )
                    }
                    </ul>
        </>
    )
}

export default Home;