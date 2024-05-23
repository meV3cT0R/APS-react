import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { axiosPostData } from "../../../utility/axios_util";
import Swal from "sweetalert2";

const EditProducts = ()=> {
    const { token } = useGlobalContext();
    const navigate = useNavigate();
    const res :any = useLoaderData();
    const formik = useFormik({
        initialValues : {
            name : res.data.name,
            price : res.data.price,
            imageList : res.data.images,
            category : res.data.category,
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


    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-[800px] mx-auto">
            <h1 className="font-bold text-3xl text-center captialize text-primary"> Add Products</h1>

                <div className="grid grid-cols-2 gap-4 ">

                <TextField formik={formik} label="Name" type="text" name="name"/>
                <TextField formik={formik} label="Price" type="number" name="price"/>
                <TextField formik={formik} label="Category" type="text" name="category" className="col-span-full"/>
                <MultipleFileUpload formik={formik} label="Images" name="imageList" />
</div>
                <Button text="Update"/>
            </form>
        </div>
    )
}

export default EditProducts;