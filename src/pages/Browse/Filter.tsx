import { FormikProps } from "formik";
import SearchBox from "../../utility/react/SearchBox";
import Select from "../../components/form/Select";
import { useEffect, useState } from "react";
import { axiosGetData } from "../../utility/axios_util";
import { Category } from "../../types/Category";

const Filter = ({ formik }: { formik: FormikProps<any>, cat?: string | null }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState([]);


    useEffect(() => {
        const func = async () => {
            axiosGetData("getCategories").then(val => {  setCategories([{ name: "all" }, ...val.data]) }).catch(err => console.log(err));
            axiosGetData("getBrands").then(val => {  setBrands(val.data) }).catch(err => console.log(err));
        }
        func();
    }, [])

    const brandObj = {};

    brands.map(brand => brandObj[brand] = brand);
    return (
        <div className="flex flex-col w-[200px] space-y-10">
            <div>
                <SearchBox formik={formik} name="keyword" />
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Category </h1>
                <ul className="space-y-1 text-gray-500 text-lg">
                    {
                        categories.map(c => {
                            return <li
                                key={JSON.stringify(c)}
                                className={`${formik.values.category.toLowerCase() == c.name.toLowerCase() ? "text-primary" : ""} cursor-pointer hover:text-primary duration-300`}
                                onClick={() => {
                                    formik.setFieldValue("category", c.name);
                                }}
                                tabIndex={0}

                                onKeyUp={(e)=> {
                                    if(e.key=="Enter")
                                        formik.setFieldValue("category", c.name);
                                }}
                            >
                                {c.name}
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

            <div className="flex-col space-y-4">
                <div>
                    <div className=" flex items-center space-x-3">
                        <input
                            type="checkbox"
                            name={"brandNew"}
                            checked={formik.values.brandNew}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[25px] h-[25px] cursor-pointer"
                        />
                        <label className="text-lg"> Brand New</label>
                    </div>

                </div>
                <div>
                    <div className=" flex items-center space-x-3">
                        <input
                            type="checkbox"
                            name={"old"}
                            checked={formik.values.old}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[25px] h-[25px] cursor-pointer"
                        />
                        <label className="text-lg"> Used</label>
                    </div>

                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-xl font-bold"> Price </h1>
                <p id="output">NRs. {formik.values.price}</p>
                <input type="range" min="1" max="10100"
                    value={formik.values.price}
                    className="cursor-pointer"
                    onInput={(e) => {
                        formik.setFieldValue("price", e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export default Filter;