import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../styles/stockin.css'

export default function Stockin() {
    const [stockin,setStockin] = useState({
        product_id:'',
        quantity:'',
        date:''
    });
    const [products,setProducts] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (event) =>{
        setStockin({...stockin,[event.target.name]:event.target.value});
    }

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/products/allproducts');
            setProducts(response.data);
          } catch (error) {
            console.log('Error fetching products:', error);
            setError('Error fetching products');
          }
        };
    
        fetchProducts();
      }, []);

    

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try {
           const response =  await axios.post('http://localhost:3000/api/stockin/createstockin',stockin);
           setStockin({product_id:'',quantity:'',date:''});
           setError(null)
           alert("stock-in recorded successfully")
        } catch (error) {
            console.log("error creating stockin",error);
            const message = error.response.data.error || "error connecting to the stock";
            setError(message);
        }
    } 

  return (
    <div className='stock-container'>
    <h2>Stockin</h2>
    {error && <p style={{color:'red',fontSize:'20px',fontWeight:'800'}}>{error}</p>}
    <form onSubmit={handleSubmit}>
        <select  name='product_id' value={stockin.product_id} onChange={handleChange}>
            <option>select a product</option>
            {products.map((product) => (
                <option key={product.productID} value={product.productID}>{product.productName}</option>
            ))}
        </select>
        <input 
        type='number'
         name='quantity'
          value={stockin.quantity}
           placeholder='quantity'
             onChange={handleChange} />
        <input
         type='date'
         name='date'
          value={stockin.date} 
          placeholder='date' 
          onChange={handleChange} />
        <button type='submit'>Submit</button>
    </form>
    </div>
  )
}
