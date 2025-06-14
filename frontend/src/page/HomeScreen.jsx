// import { useState ,useEffect} from "react";
// import products from "../../products";
// import axios from "axios";

import Product from "../components/Product";
import { useGetproductQuery } from "../slice/productsApiSlice";




const HomeScreen = () => {

    // Older Method 

    // const [products ,setproducts]=useState([])

    // useEffect(()=>{
    //     const fetchproducts = async ()=>{
    //         const  { data } = await axios.get("http://localhost:5000/api/products");
    //         setproducts(data);
    //     }
    //     fetchproducts()


    // } ,[])

    // New method for RTX Query 

    const { data:products , error ,isLoading} = useGetproductQuery();

    if(isLoading) return <p> Loading... </p>
    if(error) return <p> Error : {error}</p>


    return (
        <div className="container mx-auto px-4">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-info my-8">
                All Products
            </h1>

            {/* Products Grid */}
            <div className="grid gap-6 justify-center sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
