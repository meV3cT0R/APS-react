import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";


const Select = ({formik,name,displayName,map,label,className}: {
    formik:any,
    name : string,
    displayName?: string,
    map : any,
    label?: string,
    className? : string,
}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>();
    const selRef = useRef<HTMLDivElement>(null);

    const childInputStyle =
      `flex lg:py-3 bg-white items-center  cursor-pointer justify-between w-full border-2 md:py-2 md:px-2 lg:px-5 rounded-lg duration-300 ${showDropdown && "rounded-b-none"}` ;
    const childInputLabelStyle = "text-secondary capitalize ";
    const childInputDivStyle = ` relative ${className} `;

    useEffect(()=> {
        const onClick = (e : MouseEvent)=> {
            if(selRef.current!=null) {
                console.log();
                if(!selRef.current.contains(e.target as ChildNode)) {
                    setShowDropdown(false);
                }
            }
        }

        document.body.addEventListener("click", onClick)

        return ()=> {
            document.body.removeEventListener("click",onClick);
        }
    },[])

    
    return <div
        className={childInputDivStyle}
        ref={selRef}
    >
        {label  || <label className={childInputLabelStyle} >{label}</label>}
        <div>
        <div
            className={`${childInputStyle}`}
            onClick={() => {
                setShowDropdown(!showDropdown);
            }}
        >
            <span className="capitalize">{displayName || map[formik.values[name]] || "Select"}</span>
            <button
                onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                }}
            >
                {<FontAwesomeIcon icon={faAngleDown} className={`duration-300 ${showDropdown ? "rotate-180" : ""}`} />}

            </button>
        </div>
        {map && (
            <ul
                className={`absolute styled-scrollbars overflow-y-scroll max-h-[200px] shadow-xl bg-white w-full duration-300 ${showDropdown ? " translate-y-0 opacity-100 z-10" : " -translate-y-[20px] opacity-0 z-[-1]"}`}

            >
                {Object.keys(map).map((key) => {
                    return (
                        <li
                            className="w-full p-5 hover:bg-gray-100 cursor-pointer border bg-slate-100 capitalize"
                            onClick={() => {
                                formik.setFieldValue(name,key)
                                setShowDropdown(false);
                            }}
                            key={JSON.stringify(map[key])}
                        >
                            {map[key]}
                        </li>
                    );
                })}
            </ul>
        )}
        </div>
    </div>
}

export default Select;