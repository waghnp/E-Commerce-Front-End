import './App.css';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import Home from './Components/HomeComponent';
import ProductDetails from './Components/ProductDetailsComponent';
import Cart from './Components/CartComponent';
import SignIn from './Components/SignInComponent';
import {useSelector} from 'react-redux';
import Register from './Components/RegisterComponent';
import CreateProduct from './Components/CreateProductComponent'
import Shipping from './Components/ShippingComponent';

function App() {
    const userSignIn = useSelector(state => state.userSignIn)
    const {userInfo}=userSignIn
    console.log(userInfo)
const openMenu=()=>{
  document.querySelector(".sidebar").classList.add("open");
}
const closeMenu=()=>{
  document.querySelector(".sidebar").classList.remove("open");
}
  return (
    <BrowserRouter>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/" >Amazona</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart" >Cart</Link>
                    {userInfo?<Link to="/profile" >Hello ,{userInfo.name}</Link>:<Link to="/signin" >Sign In</Link>} 
                </div>
            </header>
            <aside className="sidebar">
               <h3>shopping catagories</h3>
               <button className="sidebar-close-button" onClick={closeMenu}>X</button>
               <ul>
                   <li>
                       <a href="index.html">Shirts</a>
                   </li>
                   <li>
                       <a href="index.html">Pants</a>
                   </li>
               </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/product/:id" component={ProductDetails} />
                    <Route path="/cart/:id?" component={Cart} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/register"  component={Register}/>
                    <Route path="/shipping" component={Shipping} />
                    <Route path="/createproduct" component={CreateProduct}  />
                </div>
             
            </main>
            <footer className="footer">
                @All rights are reserved.
            </footer>
        </div>
        </BrowserRouter>  
  );
}

export default App;
