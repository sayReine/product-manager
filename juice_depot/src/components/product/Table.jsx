import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../styles/product.css';

function Table() {
  const [products,setProducts] = useState([]);
  const [editId,setEditId] = useState(null)
  const [editedRow,setEditedRow] = useState({
    productname: '',
    buyunitprice: '',
    sellunitprice: ''
  });

  const handleEditClick = (product) =>{
    setEditId(product.productID)
    setEditedRow({
      productname: product.productName,
      buyunitprice: product.buyUnitPrice,
      sellunitprice: product.sellUnitPrice
    });
  } ;

  const handleSaveClick = async(id)=>{
    await axios.put(`http://localhost:3000/api/products/updateproduct/${id}`,editedRow)
    .then(()=>{
      setProducts(products.map(product => product.productID === id ? {...product, ...editedRow} : product));
      setEditId(null);
    })

    .catch(err =>{
      console.log("error editing product",err);
    })
  }

  const handleChange = (e)=>{
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  }


  const handledeleteClick = async(id)=>{
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:3000/api/products/deleteproduct/${id}`);
        setProducts(products.filter(product => product.productID !== id));
      } catch (error) {
        console.log("error deleting product:", error);
        
      }
    }

  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products/allproducts');
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  },[])

  return (
    <div className='product-table-container'>
      <table>
      <thead>
        <tr>
      <th>Product Id</th>
        <th>Product Name</th>
        <th>Buy unit price</th>
        <th>Sell unit price</th>
        <th colSpan={2}>action</th>
      </tr>
      </thead>
      <tbody>
        {products.map((product) => (
        <tr key={product.productID}>
          <td>{product.productID}</td>
          <td>{editId === product.productID ? (
          <input type='text'
          name='productname' 
          value={editedRow.productname} 
          onChange={handleChange}/>):(product.productName)}</td>
          <td>{editId === product.productID ? 
          (<input type='number' 
          name='buyunitprice'
          value={editedRow.buyunitprice}
          onChange={handleChange}/>):(product.buyUnitPrice)}</td>
          <td>{editId === product.productID ? 
          (<input type='number'
          name='sellunitprice'
          value={editedRow.sellunitprice}
          onChange={handleChange}/>):(product.sellUnitPrice)}</td>

          {editId === product.productID ?(
            <td>
            <button onClick={()=>handleSaveClick(product.productID)}>Save</button>
            </td>
            
          ):(
            <td>
            <button onClick={()=>handleEditClick(product)}>Edit</button>
            </td>
            
          )}
          <td><button onClick={()=>handledeleteClick(product.productID)}>Delete</button></td>

          {/* </td> */}
        </tr>
      ))}
      </tbody>
      
      
      </table>
    </div>
  )
}

export default Table