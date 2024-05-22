import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";

const AddProducts = ()=> {
    const formik = useFormik({
        initialValues : {
            name : "",
            price : "",
            images : [],
            category : "",
            specs : {}
        },
        async onSubmit(values) {
            console.log(values);
        }
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField formik={formik} label="Name" type="text" name="name"/>
                <TextField formik={formik} label="Price" type="number" name="price"/>
                <TextField formik={formik} label="Category" type="text" name="category"/>
                <MultipleFileUpload formik={formik} label="Images" name="images" />

                <Button text="Add"/>
            </form>
        </div>
    )
}

export default AddProducts;