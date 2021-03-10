import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {detailsProduct} from '../redux/actionCreators/productActions';

const ProductDetails=(props)=>{
    // const state=useSelector(state=>state);
    // console.log(state)
    const [qty, setqty] = useState(1)
    const productId=props.match.params.id
    console.log(typeof(productId))
    const productDetails=useSelector(state => state.productDetails)
    const {loading,product,error}=productDetails
    // console.log('Product '+product)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailsProduct(productId))
        return () => {
            //cleanup
        }
    }, [])
    const handleAddToCart=()=>{
        props.history.push('/cart/'+props.match.params.id+'?qty='+qty)
    }
    return(
        <>
            <div className="back-to-result">
                <Link to="/" >Back to result</Link>
            </div>
            {
                loading?<div>Loading...</div>:
                error?{error}:
                (
                    <div className="details">
                        <div className="details-image"> 
                            <img src={product.image} alt="product"/>
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Stars ({product.numReviews} Reviews)
                                </li>
                                <li>
                                Price : <b>${product.price}</b>
                                </li>
                                <li>
                                    Description : 
                                        <div>{product.description}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price : {product.price}
                                </li>
                                <li>
                                    Status : {product.countInStock>0? 'In Stock' : 'Out of Stock'}
                                </li>
                                <li>
                                    Qty : <select value={qty} onChange={(e)=>setqty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(x => 
                                            <option key={x+1} value={x+1}>{x+1}</option>
                                            )}
                                    </select>
                                </li>
                                <li>
                                   {product.countInStock>0 && <button onClick={handleAddToCart} className="button primary">Add to cart</button>}
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductDetails;