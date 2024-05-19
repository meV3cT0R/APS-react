import { useFormik } from "formik";
import Select from "../../components/form/Select";
import ProductCard from "./ProductCard";
import { ProductType } from "./ProductType";
import { Link } from "react-router-dom";

const Prods = ({products} : {products : ProductType[]})=> {
    
    const formik = useFormik({
        initialValues: {
            sortBy : "asc"
        },

        onSubmit: values => {

            alert(JSON.stringify(values, null, 2));

        },

    });
    
    return (
        <div className="flex flex-col w-full space-y-2 ">
            <div className="flex justify-between py-3 text-lg">
                <div>
                    {products.length} products
                </div>

                <div className="flex space-x-5 items-center justify-between relative">
                    <div>Sort By</div> 
                    <Select formik={formik} name="sortBy" map={
                    {
                        "desc": "highest to lowest",
                        "asc": "lowest to highest",
                    }}


                    className="w-[300px]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-4 ">
                {products.map(product=> {
                    return <Link to={`${product.id}`}><ProductCard key={JSON.stringify(product)} {...product}/></Link>
                })}
            </div>
        </div>
    )
}

export default Prods;