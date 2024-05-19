import { useFormik } from "formik";
import Select from "../../components/form/Select";
import ProductCard from "./ProductCard";

const Prods = ()=> {
    const formik = useFormik({
        initialValues: {
            sortBy : "asc"
        },

        onSubmit: values => {

            alert(JSON.stringify(values, null, 2));

        },

    });
    const products = [ 
        {
            img : "",
            title : "some random product you prolly wanna buy",
            price : 445
        },
        {
            img : "",
            title : "some random product you prolly wanna buy",
            price : 445
        },
        {
            img : "",
            title : "some random product you prolly wanna buy",
            price : 445
        },
        {
            img : "",
            title : "some random product you prolly wanna buy",
            price : 445
        },
        {
            img : "",
            title : "some random product you prolly wanna buy",
            price : 445
        },
        {
            img : "",
            title : "some random product you prolly wanna buy",
            price : 445
        },
    ]
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
                    return <ProductCard key={JSON.stringify(product)} {...product}/>
                })}
            </div>
        </div>
    )
}

export default Prods;