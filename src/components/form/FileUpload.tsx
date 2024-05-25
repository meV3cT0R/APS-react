import { imageURL } from "../../utility/constants";
import "./FileUpload.css";
import Info from "./Info";
import Image from "../Image";

const FileUpload = ({
  formik,
  name,
  label,
  info,
  required=false
}: {
  formik: any;
  name: string;
  label: string;
  info?: string;
  required?:boolean;
}) => {
  let url = formik.values[name] ;
  if(formik.values[name] instanceof File) {
    url = URL.createObjectURL(formik.values[name]);
  }
  return (
    <div className={`space-y-5 ${formik.values[name] ? "row-span-2" : ""}`}>
      <label className="block text-secondary" htmlFor={name}> {label}</label>
      {info && <Info text={info} />}
      <input
        required={required}
        type="file"
        accept="image/*"
        name={name}
        onChange={(e) => {
          if (e.target.files) {
            formik.setFieldValue(name, e.target.files[0]);
          }
        }}
        onBlur={() => formik.setFieldTouched(name, true)}
        className="w-full custom-file-selector mt-2  text-white"
      />
      {formik.values[name] && <Image src={(url.startsWith("http") || url.startsWith("blob")) && url || imageURL+url} className=""/>}
    </div>
  );
};

export default FileUpload;