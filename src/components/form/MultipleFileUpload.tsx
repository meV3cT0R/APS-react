import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FileUpload.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Info from "./Info";
import { imageURL } from "../../utility/constants";
import Image from "../Image";

const MultipleFileUpload = ({
  formik,
  name,
  label,
  info,
}: {
  formik: any;
  name: string;
  label: string;
  info?: string;
}) => {

  return (
    <div className={`space-y-5 ${formik.values[name] ? "row-span-2" : ""}`}>
      <label className="block text-secondary"> {label}</label>
      {info && <Info text={info} />}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            formik.setFieldValue(name, [...formik.values[name],...e.target.files]);
          }
        }}
        onBlur={() => formik.setFieldTouched(name, true)}
        className="w-full custom-file-selector  mt-2 text-white"
      />
      {formik.values[name] && (
        <div className="grid grid-cols-4 gap-4">
          {formik.values[name].map((file: any, index: number) => {
            if(file==undefined) return
            let url = imageURL + file

            if (file instanceof File) {
              url = URL.createObjectURL(file);
            }

            return (
              <div className="h-24 w-24 relative" key={JSON.stringify(file)}>
                <Image
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full "
                />
                <FontAwesomeIcon 
                icon={faX} 
                className="absolute top-2 right-2 text-red-500 text-xl cursor-pointer"

                onClick={()=>{
                  const obj = {

                  }
                  formik.values[name].filter((f : string)=>f!=file)

                  formik.setFieldValue(name,obj)
                  
                }}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default MultipleFileUpload;