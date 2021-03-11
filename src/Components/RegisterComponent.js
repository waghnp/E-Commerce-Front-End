import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { register } from '../redux/actionCreators/userActions';

const Register=(props)=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister)
    const {loading,userInfo,error}=userRegister
    const dispatch = useDispatch();
    const redirect=props.location.search?props.location.search.split("=")[1]:"/";
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
        return () => {
            //cleanup
        }
    }, [userInfo,dispatch])
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password===rePassword)
            dispatch(register(name,email,password))
        else
            alert("Please Check the Password")
    }
    return(
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li> <h2>Create Account</h2> </li>
                    <li>
                        {loading && <div>Loading....</div> }
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="Enter E-mail" onChange={(e)=>setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="rePassword">Confirm-Password</label>
                        <input type="password" name="rePassword" placeholder="Confirm Password" onChange={(e)=>setRePassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Register</button>
                    </li>
                    <li>
                        {"Already have an account"}
                    </li>
                    <li>
                        <Link to={redirect==="/"?"/signin":"signin/redirect="+redirect} className="button  secondary text-center" >Sign In</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Register;