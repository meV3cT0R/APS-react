import { useFormik } from "formik";
import Container from "../../utility/react/Container";
import TextField from "../../components/form/TextField";
import Button from "../../components/form/Button";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { axiosPostJsonData } from "../../utility/axios_util";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const { token } = useGlobalContext();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: "",
            email: "",
            cPassword: "",
            address: "",
            phoneNumber: ""
        },
        async onSubmit(values) {
            console.log(values);

                await axios
                    .post("register", values, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(_ => {Swal.fire({text:"User Succesfully created",icon:"success"}); navigate("/login")})
                    .catch((error) => {
                        Swal.fire({text:"Something Went Wrong",icon:"error"});
                        throw new Error(error);
                    });
        },
        validationSchema: (Yup.object().shape({
            name: Yup.string().min(2).max(50).required(),
            username: Yup.string().min(6).max(30).required(),
            password: Yup.string().min(8).max(32).required(),
            address: Yup.string().max(50).required(),
            email: Yup.string().email().required(),
            phoneNumber: Yup.string().length(10, "Must be 10 digits").required(),
            cPassword: Yup.string().oneOf([Yup.ref('password'), ""], "password must match").required("")
        }))
    })
    return (
        <Container >
            <div className="w-[700px] mx-auto">
                <form className="grid grid-cols-2 gap-5" onSubmit={formik.handleSubmit}>
                    <div className="col-span-full">
                        <h1 className="text-center text-primary text-3xl font-bold">Register</h1>
                    </div>

                    <TextField type="text" name="name" label="Name" formik={formik} labelClassName="" />
                    <TextField type="text" name="username" label="Username" formik={formik} />
                    <TextField type="text" name="email" label="E-mail" formik={formik} className="col-span-full" />
                    <TextField type="text" name="address" label="Address" formik={formik} className="col-span-full" />
                    <TextField type="text" name="phoneNumber" label="Phone Number" formik={formik} className="col-span-full" />
                    <TextField type="password" name="password" label="Password" formik={formik} />
                    <TextField type="password" name="cPassword" label="Confirm Password" formik={formik} />
                    <div className="text-center col-span-full">
                        <Button text="Register" />
                    </div>
                    <div className="col-span-full text-center m-5">
                        <p className="text-lg text-gray-500"> Already Registerd? <Link className="text-blue-900 " to="/login"> Log in</Link></p>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Register;