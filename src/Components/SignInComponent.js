import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { signIn } from '../redux/actionCreators/userActions';

const SignIn=(props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector(state => state.userSignIn)
    const {loading,userInfo,error}=userSignIn
    const dispatch = useDispatch()
    useEffect(() => {
        if(userInfo){
            props.history.push('/');
        }
        return () => {
            //cleanup
        }
    }, [userInfo])
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signIn(email,password))
    }
    return(
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li> <h2>Sign In</h2> </li>
                    <li>
                        {loading && <div>Loading....</div> }
                        {error && <div>{error}</div>}
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
                        <button type="submit" className="button primary">Sign In</button>
                    </li>
                    <li>
                        {"New to amazona"}
                    </li>
                    <li>
                        <Link to="/register" className="button  secondary text-center" >Create New amazona account</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default SignIn;