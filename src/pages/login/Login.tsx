import { useFormik } from "formik";
import Container from "../../utility/react/Container";
import TextField from "../../components/form/TextField";
import Button from "../../components/form/Button";
import { Link } from "react-router-dom";

const Login = () => {

    const formik = useFormik({
        initialValues: {
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
                        <h1 className="text-center text-primary text-3xl font-bold">Log in</h1>
                    </div>
                    <div>
                        <TextField type="text" name="username" label="Username" formik={formik} />
                        <TextField type="text" name="password" label="Password" formik={formik} />
                        <div className="flex justify-end">
                            <Button text="Log in"/>
                        </div>
                    </div>
                    <p className="text-center text-lg text-gray-500">New to Shop? <Link to="/register" className="text-blue-900"> Create new Account </Link></p>
                </form>
            </div>
        </Container>
    )
}

export default Login;