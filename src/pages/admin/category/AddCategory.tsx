import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import FileUpload from "../../../components/form/FileUpload";
import Button from "../../../components/form/Button";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { axiosPostData } from "../../../utility/axios_util";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCategory = ()=> {
    const {token} = useGlobalContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            name : "",
            file: ""
        },
        async onSubmit(values, {resetForm}) {
            if(token) {
                await axiosPostData("admin/saveCategory",values,token).then(_=> {
                    resetForm();
                    navigate("/admin/category")
                }).catch(err=> {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err,
                      });
                })
            }
        }
    },

)
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="w-[500px] px-20 py-10 shadow-xl space-y-5">
                <h1 className="text-3xl text-primary font-bold"> Add Category</h1>
                <TextField
                        formik={formik}
                        label={"Name"}
                        name="name"
                        type="text"
                />
                <FileUpload
                    name="file"
                    formik={formik}
                    label="Image"

                />
                <Button text="Add"/>
            </form>
        </div>
    )
}

export default AddCategory;