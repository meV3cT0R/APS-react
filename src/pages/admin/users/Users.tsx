import { useLoaderData } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";
import { TableObjectType } from "../../../components/admin/types";

const Users = () => {
    const res = useLoaderData();
    return (
        <div>
            <TableWithPagination 
            columns={["name","username","address","orders"]}
            avoidColumns={["id"]}
            datas={res && (res as any).data.map((data:any)=> {
                return {
                    "id" : data.id,
                    "name" : data.name,
                    "username" : data.username,
                    "address" : data.address || "",
                    "orders" : {
                        url : `orders/${data.id}`,
                        text: "View Orders",
                        type : TableObjectType.LINK
                    }
                }
            })}
            editButton={false}
            />
        </div>
    )
}

export default Users;