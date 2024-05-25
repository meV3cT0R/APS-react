import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import FileUpload from "../../../components/form/FileUpload";
import Button from "../../../components/form/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { axiosPostData } from "../../../utility/axios_util";
import Swal from "sweetalert2";

const EditCategory = () => {
    const res = useLoaderData();
    const {token} = useGlobalContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            id : "",
            name : "",
            file: ""
        },
        async onSubmit(values, {resetForm}) {
            if(token) {
                await axiosPostData("admin/saveCategory",values,token).then(_=> {
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
    useEffect(() => {
        if (res.data) {
            formik.setValues({
                id:res.data.id,
                name: res.data.name,
                file: res.data.image
            });
        }
        window.scrollTo(0,0);
    }, [res]);

    
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="w-[500px] px-20 py-10 shadow-xl space-y-5">
                <h1 className="text-3xl text-primary font-bold"> Edit Category</h1>
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
                <Button text="Edit" />
            </form>
        </div>
    )
}

export default EditCategory;