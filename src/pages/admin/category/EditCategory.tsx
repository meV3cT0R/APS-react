import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import FileUpload from "../../../components/form/FileUpload";
import Button from "../../../components/form/Button";
import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

const EditCategory = () => {
    const res = useLoaderData();
    console.log(res);
    const formik = useFormik({
        initialValues: {
            name: res,
            file: ""
        },
        async onSubmit(values) {

        }
    },

    )
    useEffect(() => {
        if (res.data) {
            formik.setValues({
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