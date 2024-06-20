import { useFormik } from "formik";
import Container from "../../utility/react/Container";
import TextField from "../../components/form/TextField";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../hooks/useGlobalContext";




const Login = () => {
    const navigate = useNavigate();
    const { token, setToken, setUser } = useGlobalContext();
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        async onSubmit(values) {
            const res = await axios
                .post("login", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(async (val) => {
                    setToken(val.data.token);

                    localStorage.setItem("token", val.data.token);
                    setUser(val.data.userData)

                    if(val.data.userData.role.toLowerCase()=="admin") {
                        navigate("/admin");
                    }else navigate("/products");
                })
                .catch((error) => {
                    throw new Error(error);
                });
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
                        <TextField type="password" name="password" label="Password" formik={formik} />
                        <div className="flex justify-end">
                            <Button text="Log in" />
                        </div>
                    </div>
                    <p className="text-center text-lg text-gray-500">New to Shop? <Link to="/register" className="text-blue-900"> Create new Account </Link></p>
                </form>
            </div>
        </Container>
    )
}

export default Login;