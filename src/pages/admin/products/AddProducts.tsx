import { useFormik } from "formik";
import TextField from "../../../components/form/TextField";
import MultipleFileUpload from "../../../components/form/MultipleFileUpload";
import Button from "../../../components/form/Button";
import { axiosGetData, axiosPostData } from "../../../utility/axios_util";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "../../../components/form/Select";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const AddProducts = () => {
    const { token } = useGlobalContext();
    const navigate = useNavigate();

    const [category,setCategory] = useState<any[]>([]);
    
    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            imageList: [],
            category: "",
            brandNew : true,
            brand : "",
            specs :[["speed","1000 RPM"]]
        },
        async onSubmit(values) {
            if (token) {
                const specs :any = {};

                values.specs.map(spec=> {if(spec[0].trim()!="" && spec[1].trim()!="") specs[spec[0]]=spec[1]})
                axiosPostData("admin/saveProduct", {
                    ...values,
                    specs: JSON.stringify(specs)
                }, token).then(_=>navigate("/admin/products")).catch(err=> {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err,
                      });
                });
            }
        }
    })

    useEffect(()=> {
        const func = async ()=> {
                axiosGetData("getCategories").then(val=> {
                    setCategory(val.data);
                }).catch(err=>console.log(err));
        }

        func();
    },[])
    const catObj :any = {};
    category.map(cat=> catObj[cat.id]=cat.name);
    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-[800px] mx-auto">
                <h1 className="font-bold text-3xl text-center captialize text-primary"> Add Products</h1>

                <div className="grid grid-cols-2 gap-4 ">

                    <TextField formik={formik} label="Name" type="text" name="name" />
                    <TextField formik={formik} label="Price" type="number" name="price" />
                    <Select formik={formik} label="Category" map={catObj} name={"category"}/>
                    
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
                        {formik.values.specs.map((_,i)=> {
                            return (
                                <div className="grid grid-cols-2 gap-4" key={"randfadsfsadf"+i}>
                                    <input
                                     type="text"
                                     className="border-2 px-3 py-2 rounded-lg"
                                      onChange={(e)=> {
                                        formik.setFieldValue(`specs[${i}][0]`,e.target.value);
                                      }}
                                       value={formik.values.specs[i][0]}
                                       placeholder="key"
                                       />
                                       
                                    <input 
                                    type="text"
                                    className="border-2 px-3 py-2 rounded-lg"
                                     onChange={(e)=> {
                                        formik.setFieldValue(`specs[${i}][1]`,e.target.value);
                                      }}
                                     value={formik.values.specs[i][1]}
                                     placeholder="value"
                                     
                                     />

                                </div>
                            )
                        })}
                        <button type="button" onClick={()=> {
                            formik.setValues({
                                ...formik.values,
                                specs :[...formik.values.specs,["",""]]
                            })
                        }}>
                                <FontAwesomeIcon icon={faAdd} className="rounded-[50%] w-[20px] h-[20px] p-2 text-white mt-2 bg-green-500"/>
                        </button>
                    </div>

                    <TextField formik={formik} label="Brand" type="text" name="brand"/>
                    <MultipleFileUpload formik={formik} label="Images" name="imageList" />


                </div>
                <Button text="Add" />
            </form>
        </div>
    )
}

export default AddProducts;