import { useEffect, useState } from "react";
import { products } from "../../dummy_data/products";
import Container from "../../utility/react/Container";
import Wrapper from "../../utility/react/Wrapper";
import Filter from "./Filter";
import Prods from "./Prods";
import { useSearchParams } from "react-router-dom";
import { ProductType } from "./ProductType";
import { axiosGetData } from "../../utility/axios_util";
import { useFormik } from "formik";

const Browse = () => {
    const [params,_] = useSearchParams();
    const [products,setProducts] = useState<ProductType[] >([]);
    const formik = useFormik({
        initialValues: {
            keyword: "",
            category: params.get("cat")?.toLowerCase() || "all",
            brand: "all",
            price : 2000,
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

    });
    useEffect(()=> {
        const func = async ()=> {
            axiosGetData("getAllProducts").then(val=>{console.log(val);setProducts(val.data)}).catch(err=>console.log(err));
        }

        func();
    },[])

    return (
        <Container>
            <Wrapper className="">
                <div className="flex space-x-10 items-start ">
                    <Filter formik={formik}/>
                    <Prods filter={formik} products={products}/>
                </div>
            </Wrapper>
        </Container>

    )
}

export default Browse;