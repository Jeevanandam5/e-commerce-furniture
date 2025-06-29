import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
        getproduct :builder.query({
            query:()=>({
                url: PRODUCT_URL,
                 keepUnusedDataFor: 20,       
                 refetchOnFocus: false,          
                 refetchOnReconnect: false,
            })
        }),
        getproductDetails:builder.query({
            query:(id) =>({
                url:`${PRODUCT_URL}/${id}`,
                keepUnusedDataFor: 40,
            })
        })
    })
})

export const { useGetproductQuery , useGetproductDetailsQuery } = productApiSlice;
