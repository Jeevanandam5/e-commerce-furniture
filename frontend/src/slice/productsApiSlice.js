import { PRODUCT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints :(builder) =>({
        getproduct :builder.query({
            query:()=>({
                url: PRODUCT_URL
            })
        }),
        getproductDetails:builder.query({
            query:(id) =>({
                url:`${PRODUCT_URL}/${id}`
            })
        })
    })
})

export const { useGetproductQuery , useGetproductDetailsQuery } = productApiSlice;