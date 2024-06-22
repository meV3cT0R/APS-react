import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { axiosGetData, axiosPostData } from "../../../utility/axios_util";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Select from "../../../components/form/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";

const EditProducts = () => {
    const { token } = useGlobalContext();
    const navigate = useNavigate();
    const res: any = useLoaderData();
    const formik = useFormik({
        initialValues: {
            name: res.data.aname.name,
            price: res.data.aname.price,
            imageList: res.data.images,
            category: res.data.category.id,
            specs: Object.keys(res.data.specs).map(key => [key, res.data.specs[key]]) || [],
            brandNew: res.data.brandNew || false
        },
        async onSubmit(values) {
            if (token) {
                const specs: any = {};

                values.specs.map(spec => { if (spec[0].trim() != "" && spec[1].trim() != "") specs[spec[0]] = spec[1] })
                console.log({
                    ...values,
                    specs: JSON.stringify(specs)
                })
                axiosPostData("admin/updateProduct/" + res.data.id, {
                    ...values,
                    specs: JSON.stringify(values.specs)
                }, token).then(_ => navigate("/admin/products")).catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err,
                    });
                });
            }
        }
    })
    const [category, setCategory] = useState<any[]>([]);

    useEffect(() => {
        const func = async () => {
            axiosGetData("getCategories").then(val => {
                setCategory(val.data);
            }).catch(err => console.log(err));
        }

        func();
    }, [])
    const catObj: any = {};
    category.map(cat => catObj[cat.id] = cat.name);


    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-[800px] mx-auto shadow-lg px-10 py-5">
                <h1 className="font-bold text-3xl text-center captialize text-primary"> Edit Product</h1>

                <div className="grid grid-cols-2 gap-4 ">

                    <TextField formik={formik} label="Name" type="text" name="name" />
                    <TextField formik={formik} label="Price" type="number" name="price" />
                    <Select formik={formik} label="Category" map={catObj} name={"category"} />
                    <div className="pt-7 flex items-center space-x-3">
                        <input
                            type="checkbox"
                            name={"brandNew"}
                            checked={formik.values.brandNew}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-[25px] h-[25px] cursor-pointer"
                        />
                        <label className="text-lg"> Brand New</label>
                    </div>
                    <div className="space-y-5">
                        {formik.values.specs.map((_, i) => {
                            return (
                                <div className="flex space-x-4">
                                    <div className="grid grid-cols-2 gap-4" key={"randfadsfsadf" + i}>
                                        <input
                                            type="text"
                                            className="border-2 px-3 py-2 rounded-lg"
                                            onChange={(e) => {
                                                formik.setFieldValue(`specs[${i}][0]`, e.target.value);
                                            }}
                                            value={formik.values.specs[i][0]}
                                            placeholder="key"
                                        />

                                        <input
                                            type="text"
                                            className="border-2 px-3 py-2 rounded-lg"
                                            onChange={(e) => {
                                                formik.setFieldValue(`specs[${i}][1]`, e.target.value);
                                            }}
                                            value={formik.values.specs[i][1]}
                                            placeholder="value"

                                        />

                                    </div>
                                    <button
                                    type="button"
                                        onClick={() => {
                                            formik.setValues({
                                                ...formik.values,
                                                specs: [...formik.values.specs.slice(0,i), ...formik.values.specs.slice(i+1,formik.values.specs.length)]
                                            })
                                        }}
                                    >
                                            <FontAwesomeIcon icon={faSubtract} className="rounded-[50%] w-[10px] h-[10px] p-2 text-white mt-2 bg-red-500" />

                                    </button>
                                </div>
                            )
                        })}
                        <button type="button" onClick={() => {
                            formik.setValues({
                                ...formik.values,
                                specs: [...formik.values.specs, ["", ""]]
                            })
                        }}>
                            <FontAwesomeIcon icon={faAdd} className="rounded-[50%] w-[20px] h-[20px] p-2 text-white mt-2 bg-green-500" />
                        </button>
                    </div>
                    <MultipleFileUpload formik={formik} label="Images" name="imageList" />
                </div>
                <Button text="Update" />
            </form>
        </div>
    )
}

export default EditProducts;