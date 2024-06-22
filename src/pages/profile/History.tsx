import { Navigate } from "react-router-dom";
import TableWithPagination from "../../components/admin/TableWithPagination";
import { TableObjectType } from "../../components/admin/types";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const History = ()=> {
    const {user}  = useGlobalContext();
    if(!user) return <Navigate to="/login"/>
    return (
        <div>
            <TableWithPagination
                columns={["id","bought on","total cost","details"]}
                datas={user.orders.map((order:any)=>{
                    return {
                        id : order.id,
                        checkedOutDate : (new Date(order.checkedOutDate)).toLocaleDateString("en-US"),
                        totalCost : "Nrs. "+order.totalCost,
                        viewDetails : {
                            url : `/invoice`,
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

export default History;