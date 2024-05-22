import { FormikProps } from "formik";
import SearchBox from "../../utility/react/SearchBox";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { axiosGetData } from "../../utility/axios_util";

const Filter = ({formik,cat} : {formik :FormikProps<any>,cat?:string |null}) => {
    const [categories,setCategories] = useState([]);
    const [brands,setBrands] = useState([]);
    

    useEffect(()=> {
        const func = async ()=> {
            axiosGetData("getCategories").then(val=>{console.log(val);setCategories(val.data)}).catch(err=>console.log(err));
            axiosGetData("getBrands").then(val=>{console.log(val);setBrands(val.data)}).catch(err=>console.log(err));
        }

        func();
    },[])

    const brandObj = {};

    brands.map(brand=> brandObj[brand]=brand);
    console.log(brandObj);
    return (
        <div className="flex flex-col w-[200px] space-y-10">
            <div>
                <SearchBox />
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Category </h1>
                <ul className="space-y-1 text-gray-500 text-lg">
                    {
                        categories.map(c => {
                            return <li 
                            className={`${formik.values.category.toLowerCase()==c.toLowerCase()?"text-primary":""} cursor-pointer hover:text-primary duration-300`}
                            onClick={()=> {
                                formik.setFieldValue("category",c);
                                console.log(c);
                            }}
                            >
                                {c}
                            </li>
                        })
                    }
                </ul>
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Brand </h1>
                <Select formik={formik} name="brand" map={
                    brandObj
                }
                />
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Price </h1>
                <p id="output">$ {formik.values.price}</p>
                <input type="range" min="1" max="10100"
                    value={formik.values.price }
                    className="cursor-pointer"
                    onInput={(e) => {
                        formik.setFieldValue("price",e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export default Filter;