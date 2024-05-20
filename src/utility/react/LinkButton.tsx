import { Link } from "react-router-dom";

const LinkButton = ({ text,to,className }: { text?: string ,to:string,className?:string}) => {
    return (
        <Link 
            to={to}
        className={` mt-10 text-xl border-2 border-primary px-5 py-2  rounded text-primary hover:bg-primary hover:text-white duration-300 ${className}`}>
            {text || "Submit"}
        </Link>
    )
}

export default LinkButton;