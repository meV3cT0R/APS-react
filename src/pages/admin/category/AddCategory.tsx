import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import FileUpload from "../../../components/form/FileUpload";
import Button from "../../../components/form/Button";

const AddCategory = ()=> {
    const formik = useFormik({
        initialValues : {
            name : "",
            file: ""
        },
        async onSubmit(values) {

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