import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const FAB =({style,icon,to}:{style:string,icon:IconDefinition,to:string})=> {
    const navigate = useNavigate();
    return (
        <button 
        className={`fixed rounded-[50%] bg-primary text-2xl shadow-xl w-[50px] h-[50px] text-white text-center ${style}`}
        onClick={()=>navigate(to)}
        >
            <FontAwesomeIcon icon={icon}/>
        </button>
    )
}

export default FAB;