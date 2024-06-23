import { useFormik } from "formik";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
    const { user, token,setUser } = useGlobalContext();

    const navigate = useNavigate();
    if (!user) { return <Navigate to="/login" /> }
    const formik = useFormik({
        initialValues: {
            name: user.name,
            address: user.address,
            phone: user.phone
        },
        async onSubmit(values: any) {
            if (token) {
                Swal.fire({
                    text: "Do you want to continue?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No"
                }).then(async result => {
                    if (result.isConfirmed) {

                        const formData = new FormData();
                        Object.keys(values).map(key => {
                            formData.append(key, values[key]);
                        })
                        formData.append("id",user.id);
                        await axios.put("user/update", formData, {
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "multipart/form-data",
                            }
                        }).then(val => {if(setUser) setUser(val.data); Swal.fire({text:"User data successfully updated",icon:"success"}); navigate("")})
                    }
                })


            }
        }
    });
    return (
        <div>
            <form className="grid grid-cols-12 justify-center items-center gap-8 max-w-[600px]" onSubmit={formik.handleSubmit}>
                <div className="col-span-2 text-lg "> Name</div>
                <div className="col-span-10">
                    <input type="text" name="name" className="border-2 px-3 py-2 rounded-lg w-full" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>
                <div className="col-span-2 text-lg "> Address</div>
                <div className="col-span-10">
                    <input type="text" name="address" className="border-2 px-3 py-2 rounded-lg w-full" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>
                <div className="col-span-2 text-lg "> Phone </div>
                <div className="col-span-10">
                    <input type="text" name="phone" className="border-2 px-3 py-2 rounded-lg w-full" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                </div>

                <div className="col-span-full justify-self-end">
                    <button className="bg-primary text-lg text-white px-3 py-2 hover:shadow-lg rounded-lg"> Save</button>
                </div>
            </form>
        </div>
    )
}

export default Details;