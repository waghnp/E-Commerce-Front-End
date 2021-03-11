 import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { listProducts,saveProduct,deleteProduct } from '../redux/actionCreators/productActions';

const CreateProduct=()=>{
    const [modalVisible,setModalVisible]=useState(false);
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');         
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [catagory, setCatagory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productList = useSelector(state => state.productList)
    const {loading,products,error}=productList
    const productSave = useSelector(state => state.productSave)
    const {loading:loadingSave,success:successSave,error:errorSave}=productSave
    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete,success:successDelete,error:errorDelete}=productDelete
    const dispatch = useDispatch()
    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts())
        return () => {
            //cleanup
        }
    }, [successSave,successDelete,dispatch]);

    const openModal=(product)=>{
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setBrand(product.brand);
        setCatagory(product.catagory);
        setCountInStock(product.countInStock);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveProduct({_id:id,name,price,image,brand,catagory,description,countInStock}))
    }
    const deleteHandler=(product)=>{
        dispatch(deleteProduct(product._id));
    }
    return(
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick={()=>openModal({}) } type="button">Create Product</button>
            </div>
            {modalVisible && 
                <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li> <h2>Create Product</h2> </li>
                        <li>
                            {loadingSave && <div>Loading....</div> }
                            {!id ? (successSave && <div>Product added successfully</div> ):(successDelete && <div>Product Updated successfully</div>)}
                            {errorSave && <div>{error}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={name} id="name" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input type="text" name="price" value={price} id="price" placeholder="Enter price" onChange={(e)=>setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">Image</label>
                            <input type="text" name="image" value={image} id="image" placeholder="Enter image" onChange={(e)=>setImage(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" value={brand} id="brand" placeholder="Enter brand" onChange={(e)=>setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="countInStock">Count In Stock</label>
                            <input type="text" name="countInStock" value={countInStock} id="countInStock" placeholder="Enter countInStock" onChange={(e)=>setCountInStock(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="catagory">Catagory</label>
                            <input type="text" name="catagory" value={catagory} id="catagory" placeholder="Enter catagory" onChange={(e)=>setCatagory(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="description">Description</label>
                            <textarea name="description" value={description} id="description" placeholder="Enter description" onChange={(e)=>setDescription(e.target.value)} />
                        </li>
                     
                        <li>
                            <button type="submit" className="button primary">{id?"Update Product":"Create Product"}</button>
                        </li>
                        <li>
                            <button onClick={()=>setModalVisible(false)} className="button">Back</button>
                        </li>
                    </ul>
                </form>
            </div>
        
            }
                <div className='product-list'>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Brand</th>
                        <th>Catagory</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.brand}</td>
                            <td>{product.catagory}</td>
                            <td>
                                <button className="button" onClick={()=>openModal(product)} type="button">Edit</button>
                                <button className="button" onClick={()=>deleteHandler(product)} type="button">Delete</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </div>
        
    )
}

export default CreateProduct;