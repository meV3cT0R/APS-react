import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Info =({text}:{text:string})=> {
    const [close,setClose] = useState<boolean>(false);

    return (
        <div
            className={`flex items-center justify-between w-full border-blue-300 border rounded-xl  bg-blue-200 text-blue-900 px-5 py-3 shadow-lg ${close && "hidden"}`}
        >
            {text}
            <button
                onClick={()=>setClose(true)}
            >
            <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}

export default Info;