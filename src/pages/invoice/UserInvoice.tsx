import Invoice from "./Invoice";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";

const UserInvoice = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col max-w-[800px] mx-auto py-10">
            <Invoice/>
            <div className="flex justify-end px-10">
                    <Button text="browse more products" onClick={()=>navigate("/products")}/>
                </div>
        </div>
    )
}

export default UserInvoice;