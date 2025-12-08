import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import ProductServices from "../../services/productServices"
import { useNavigate } from "react-router-dom"
import { setAddToCart, setItems } from "../../redux/feature/cartSlice";
import cartServices from "../../services/cartServices";


function ProductPage(){
       const suggestions = ["shirt", "kids dress", "women saree", "mobiles"];
const [placeholder, setPlaceholder] = useState(suggestions[0]);
    const [products,setProducts]=useState([])
    const[search,setSearch]=useState('');
    const [selectedCategory, setSelectedCategory] = useState("");
    const [count,setCount]=useState(0)

    
    const dispatch=useDispatch()
    // const navigate=useNavigate()
    // const dispatch=useDispatch()
  
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % suggestions.length;
      setPlaceholder(suggestions[index]);
    }, 2000); // change every 1.5 seconds

    return () => clearInterval(interval);
  }, []);
    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
 const response=await ProductServices.getProducts()
 console.log('get all products resposne in user page:',response.data)
 setProducts(response.data)
            }catch(error){
                console.log('get all products error in user page:',error)
            }
 

        }
        fetchProducts()
    },[])

    const handleCart=async(productId)=>{
try{
    let quantity=1
const response=await cartServices.addToCart(productId,quantity);
dispatch(setItems(response.data.cart.items))
setCount(count+1)
console.log('cart resposnse is:',response.data)
}catch(err){
console.log('cart  error resposne is:',err)
}

    }
let productsSearch=products.filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()))
     const categories=[...new Set(products.map((p)=>p.category))]
     if (selectedCategory) {
  productsSearch = productsSearch.filter(
    (p) => p.category === selectedCategory       // ✔️ because category is string
  );
}
    return(
        <> 
        <div className="bg-gray-200 p-4">
        {/* <div className="text-center mt-12 mb-4 mx-auto">Show All products </div> */}
        <div className=" md:ml-32 flex flex-col md:flex-row md:gap-6 items-center justify-center">
            <input type='text' onChange={(e)=>setSearch(e.target.value)} placeholder={placeholder} className="border-black rounded-full  border w-[100%] px-4 py-2 w-full  md:w-[50%] mb-6 mt-16 "/>
           <div className="  md:mt-10  ">
             <select className=" p-2"  onChange={(e)=>setSelectedCategory(e.target.value)}>
                <option value=''>-select category-</option>
                {categories.map((filter,index)=>
                <option key={index}  value={filter}>
                {filter}
                </option>)}
            </select>
           </div>
           
        </div>
        
        <div className=" w-full  md:w-[80%]  mx-auto md:mr-6">
     <div className=" grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4  mt-4  gap-4">
            {productsSearch.map((product)=>
        <div className="bg-white " key={product._id}>
        <div className="p-4 mb-2 flex flex-col justify-center">
             <img className='w-full md:w-full h-52 rounded' src={product.image} alt='product name'/>

          <div className="mt-2">name:{product.name}</div>
         <div>price:{product.price}</div>
          <div className="mb-2">price:{product.description}</div>
          <button onClick={()=>handleCart(product._id)} className="w-full  rounded bg-blue-500 p-x-2 py-1">Add to Cart</button>
        </div>
      
         </div>
       
        )}
         </div>
        </div>
        
</div>
 
</>
       
    )
}
export default ProductPage