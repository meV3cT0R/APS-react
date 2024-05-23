import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";
import { axiosPostData } from "../../../utility/axios_util";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProducts = () => {
    const { token } = useGlobalContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            imageList: [],
            category: "",
            specs: {}
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
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-[800px] mx-auto">
                <h1 className="font-bold text-3xl text-center captialize text-primary"> Add Products</h1>

                <div className="grid grid-cols-2 gap-4 ">

                    <TextField formik={formik} label="Name" type="text" name="name" />
                    <TextField formik={formik} label="Price" type="number" name="price" />
                    <TextField formik={formik} label="Category" type="text" name="category" className="col-span-full" />
                    <MultipleFileUpload formik={formik} label="Images" name="imageList" />
                </div>
                <Button text="Add" />
            </form>
        </div>
    )
}

export default AddProducts;