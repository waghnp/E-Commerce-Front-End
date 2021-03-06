import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { saveShipping } from '../redux/actionCreators/cartActions';
import CheckoutSteps from './CheckoutSteps';

const Shipping=(props)=>{
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShipping(address,city,postalCode,country))
    }
    return(
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li> <h2>Shipping</h2> </li>
                    <li>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" placeholder="Enter City" onChange={(e)=>setCity(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input type="text" name="postalCode" placeholder="Enter Postal Code" onChange={(e)=>setPostalCode(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="country">Country</label>
                        <input type="country" name="country" placeholder="Enter Country" onChange={(e)=>setCountry(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
        </div>
        
    )
}

export default Shipping;