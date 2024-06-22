import { Navigate, useLocation } from "react-router-dom";
import Invoice from "../../invoice/Invoice";

const OrderDetails = () => {
    const {state} = useLocation();
    if(!state) return <Navigate to="/admin/users"/>
    return (
        <div>
            <Invoice />
        </div>
    )
}

export default OrderDetails;