import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { axiosGetData, axiosPostData } from "../../../utility/axios_util";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Select from "../../../components/form/Select";

const EditProducts = ()=> {
    const { token } = useGlobalContext();
    const navigate = useNavigate();
    const res :any = useLoaderData();
    const formik = useFormik({
        initialValues : {
            name : res.data.name,
            price : res.data.price,
            imageList : res.data.images,
            category : res.data.category.id,
            specs : res.data.specs || {}
        },
        async onSubmit(values) {
            if (token) {
                console.log( {
                    ...values,
                    specs: JSON.stringify(values.specs)
                })
                axiosPostData("admin/updateProduct/"+res.data.id, {
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
    const [category,setCategory] = useState<any[]>([]);

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

                <TextField formik={formik} label="Name" type="text" name="name"/>
                <TextField formik={formik} label="Price" type="number" name="price"/>
                <Select formik={formik} label="Category" map={catObj} name={"category"}/>

                <MultipleFileUpload formik={formik} label="Images" name="imageList" />
</div>
                <Button text="Update"/>
            </form>
        </div>
    )
}

export default EditProducts;