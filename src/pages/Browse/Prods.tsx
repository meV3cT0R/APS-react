import { FormikProps, useFormik } from "formik";
import Select from "../../components/form/Select";
import ProductCard from "./ProductCard";
import { ProductType } from "./ProductType";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Prods = ({ products, filter }: { products: ProductType[], filter: FormikProps<any> }) => {

    const [filteredProduct, setFilteredProduct] = useState<any[]>([]);
    const formik = useFormik({
        initialValues: {
            sortBy: "asc"
        },

        onSubmit: values => {

            alert(JSON.stringify(values, null, 2));

        },

    });

    useEffect(() => {
        if (setFilteredProduct)
            setFilteredProduct(products.filter(prod => prod.price <= filter.values.price).filter(prod => {
                if(filter.values.category=="all") return true;
                return prod.category.name.toLowerCase() == filter.values.category.toLowerCase();
            }).filter(prod=> JSON.stringify(prod).includes(filter.values.keyword)).sort((a, b) => {
                if (formik.values.sortBy == "asc")
                    return a.price - b.price;
                else
                    return b.price - a.price;
            }));

    }, [products,filter])
    return (
        <div className="flex flex-col w-full space-y-2 ">
            <div className="flex justify-between py-3 text-lg">
                <div>
                    {filteredProduct.length} products
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
                {filteredProduct.filter(prod => prod.price <= filter.values.price).sort((a, b) => {
                    if (formik.values.sortBy == "asc")
                        return a.price - b.price;
                    else
                        return b.price - a.price;
                }).map(product => {
                    return <Link to={`${product.id}`}><ProductCard key={JSON.stringify(product)} {...product} /></Link>
                })}
            </div>
        </div>
    )
}

export default Prods;