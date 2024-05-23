import { FormikProps } from "formik";

const TextField = ({formik,label,type,name,inputClassName,labelClassName,className}: {
    label : string,
    type:string,
    formik:FormikProps<any>,
    name:string,
    inputClassName ?: string,
    labelClassName ?:string,
    className ?:string,
}) => {
    
    

    return (
        <div className={"relative pt-10 "+className}>
            <input
             type={type}
              name={name} 
              className={"bg-transparent w-full focus:border-primary duration-300 focus:outline-none outline-none border-b-2 peer pt-2 text-lg "+inputClassName}
              onChange={formik.handleChange}
              value={formik.values[name]}
               />
            <label className={`${labelClassName} absolute text-gray-500 z-[-10] peer-focus:text-primary peer-focus:-translate-y-[45px] left-0 duration-300 text-xl bottom-0 ${String(formik.values[name]).trim()!='' && "-translate-y-[45px] text-primary" || ""}`}>{label}</label>
        </div>
    )
}

export default TextField;