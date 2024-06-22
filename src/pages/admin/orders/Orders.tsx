import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";
import { TableObjectType } from "../../../components/admin/types";
import { CartItem } from "../../../types/Cart";

interface Order {id:number,checkedOutDate : number,totalCost:number,cartItems:CartItem[]}

const Orders = () => {
    const { token } = useGlobalContext();
    const {id} = useParams();
    const [orders, setOrders] = useState<Order[]>([] as Order[]);
    useEffect(() => {
        const func = async () => {
            const res = await axios
                .get("/admin/getOrders/"+id, {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                        "Authorization" : "Bearer "+token
                    },
                }).then(res=> {console.log(res.data);setOrders(res.data)})
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
            <TableWithPagination
                columns={["id","bought on","total cost","details"]}
                datas={orders.map(order=>{
                    return {
                        id : order.id,
                        checkedOutDate : (new Date(order.checkedOutDate)).toLocaleDateString("en-US"),
                        totalCost : "Nrs. "+order.totalCost,
                        viewDetails : {
                            url : `/admin/orders/details/${order.id}`,
                            text: "View Details",
                            state: order,
                            type : TableObjectType.LINK,

                        }
                    }
                })}
                operations={false}
            />
        </div>
    )
}

export default Orders;