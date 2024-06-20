import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const Orders = () => {
    const { token } = useGlobalContext();
    const {id} = useParams();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const func = async () => {
            const res = await axios
                .get("/admin/getOrders/"+id, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        "Authorization" : "Bearer "+token
                    },
                }).then(res=> setOrders(res.data))
                .catch((error) => {
                    throw new Error(error);
                });

            return res;
        }
        func();
    }, [])

    if (orders == null || orders.length == 0) return "No Data...";

    return (
        <div>
            {JSON.stringify(orders)}
        </div>
    )
}

export default Orders;