import { useFormik } from "formik";
import Container from "../../utility/react/Container";
import TextField from "../../components/form/TextField";
import Button from "../../components/form/Button";

const Register = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: ""
        },
        onSubmit(values) {
            console.log(values);
        }
    })
    return (
        <Container>
            <div className="w-[500px] mx-auto">
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div >
                        <h1 className="text-center text-primary text-3xl font-bold">Register</h1>
                    </div>
                    <div>
                        <TextField type="text" name="name" label="Name" formik={formik} />
                        <TextField type="text" name="username" label="Username" formik={formik} />
                        <TextField type="text" name="password" label="Password" formik={formik} />
                        <div className="flex justify-end">
                            <Button text="Register"/>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Register;