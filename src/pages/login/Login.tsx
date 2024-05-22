import { useFormik } from "formik";
import Container from "../../utility/react/Container";
import TextField from "../../components/form/TextField";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useEffect } from "react";


 
const Login = () => {
    const navigate = useNavigate();
    const {token,setToken} = useGlobalContext();
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
                .then(val=>{
                    console.log(val);
                    setToken(val.data);
                    localStorage.setItem("token",val.data);
                    navigate("/products");
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    })

    useEffect(()=> {
        const func = async ()=> {
            const res = await axios
                .post("loginWithToken", {
                    token
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(val=>{
                    console.log(val);
                    setToken(token);
                    navigate("/products");
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
        if(token) {
            func();
        }
    },[])
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