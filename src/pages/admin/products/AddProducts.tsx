import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";
import { axiosGetData, axiosPostData } from "../../../utility/axios_util";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "../../../components/form/Select";
import { useEffect, useState } from "react";

const AddProducts = () => {
    const { token } = useGlobalContext();
    const navigate = useNavigate();

    const [category,setCategory] = useState<any[]>([]);
    
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            imageList: [],
            category: "",
            specs: {},
            brandNew : true,
            brand : ""
        },
        async onSubmit(values) {
            if (token) {
                axiosPostData("admin/saveProduct", {
                    ...values,
                    specs: JSON.stringify(values.specs)
                }, token).then(_=>navigate("/admin/products")).catch(err=> {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err,
                      });
                });
            }
        }
    })

    useEffect(()=> {
        const func = async ()=> {
                axiosGetData("getCategories").then(val=> {
                    setCategory(val.data);
                }).catch(err=>console.log(err));
        }

        func();
    },[])
    const catObj :any = {};
    category.map(cat=> catObj[cat.id]=cat.name);
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-[800px] mx-auto">
                <h1 className="font-bold text-3xl text-center captialize text-primary"> Add Products</h1>

                <div className="grid grid-cols-2 gap-4 ">

                    <TextField formik={formik} label="Name" type="text" name="name" />
                    <TextField formik={formik} label="Price" type="number" name="price" />
                    <Select formik={formik} label="Category" map={catObj} name={"category"}/>
                    
                    <div className="pt-7 flex items-center space-x-3">
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

                    <TextField formik={formik} label="Brand" type="text" name="brand"/>
                    <MultipleFileUpload formik={formik} label="Images" name="imageList" />
                </div>
                <Button text="Add" />
            </form>
        </div>
    )
}

export default AddProducts;