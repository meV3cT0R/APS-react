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
            setFilteredProduct(products.filter(prod => prod.aname.price <= filter.values.price).filter(prod => {
                if(filter.values.category=="all") return true;
                return prod.category.name.toLowerCase() == filter.values.category.toLowerCase();
            }).filter(prod=>filter.values.brand.toLowerCase()==prod.brand || filter.values.brand.toLowerCase()=="all").filter(prod=> filter.values.keyword.trim() =="" ||JSON.stringify(prod).toLowerCase().includes(filter.values.keyword.toLowerCase())).filter(prod=> (prod.brandNew && filter.values.brandNew) || (!prod.brandNew&&filter.values.old)).sort((a, b) => {
                if (formik.values.sortBy == "asc")
                    return a.aname.price - b.aname.price;
                else
                    return b.aname.price - a.aname.price;
            }));

    }, [products,filter,formik])
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
                {filteredProduct.filter(prod => prod.aname.price <= filter.values.price).sort((a, b) => {
                    if (formik.values.sortBy == "asc")
                        return a.aname.price - b.aname.price;
                    else
                        return b.aname.price - a.aname.price;
                }).map(product => {
                    return <Link key={JSON.stringify(product)} to={`${product.id}`}><ProductCard  {...product} /></Link>
                })}
            </div>
        </div>
    )
}

export default Prods;