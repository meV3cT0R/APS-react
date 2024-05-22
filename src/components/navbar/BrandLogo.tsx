import { Link } from "react-router-dom";
import apslogo from "../../assets/apslogo.png";
const BrandLogo = ({className}: {className:string})=> {
    return (
        <div className={`${className}`}>
            <Link to=""><img src={apslogo} className="w-[75px] h-[75px] "/> </Link>
        </div>
    )
}

export default BrandLogo;