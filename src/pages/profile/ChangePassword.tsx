import { useFormik } from "formik";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
    const { user, token } = useGlobalContext();
    const navigate = useNavigate();

    if (!user) return <Navigate to="/login" />
    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
        },
        async onSubmit(values: any) {
            Swal.fire({
                text: "Do you want to continue?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            }).then(
                async result => {
                    if (result.isConfirmed) {

                        const formData = new FormData();
                        Object.keys(values).map(key => {
                            formData.append(key, values[key]);
                        })
                        formData.append("username", user.username);
                        await axios.put("user/updatePassword", formData, {
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "multipart/form-data",
                            }
                        }).then(_ =>{ Swal.fire({
                            text: "Password Changed Succesfully",
                            icon : "success"
                        }).then(()=> {
                            navigate("");
                            formik.setValues({
                                password : "",
                                newPassword : ""
                            })
                        }) }).catch(err=> Swal.fire({icon:"error",title:"Something Went Wrong",text:err}))
                    }

                })
        }
    })
    return (
        <div>
            <form className="grid grid-cols-12 justify-center items-center gap-8 max-w-[600px]" onSubmit={formik.handleSubmit}>
                <div className="col-span-2 text-lg "> Password</div>
                <div className="col-span-10">
                    <input type="password" name="password" className="border-2 px-3 py-2 rounded-lg w-full" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>
                <div className="col-span-2 text-lg "> New Password</div>
                <div className="col-span-10">
                    <input type="password" name="newPassword" className="border-2 px-3 py-2 rounded-lg w-full" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>

                <div className="col-span-full justify-self-end">
                    <button className="bg-primary text-lg text-white px-3 py-2 hover:shadow-lg rounded-lg"> Save</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword;