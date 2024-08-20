import TableWithPagination from "../../../components/admin/TableWithPagination";
import { TableObjectType } from "../../../components/admin/types";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const { token } = useGlobalContext();
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        const func = async () => {
            const res = await axios
            .get("admin/getAllUsers", {
              headers: {
                "Content-Type": "application/json",
                Accept: "*/*",
                "Authorization" : "Bearer "+token
              },
            }).then(res=> {setUsers(res.data)})
                .catch((error) => {
                    throw new Error(error);
                });

            return res;
        }
        func();
    }, [token])
    return (
        <div>
            <TableWithPagination 
            columns={["name","username","address","orders"]}
            avoidColumns={["id"]}
            datas={users.map((data:any)=> {
                return {
                    "id" : data.id,
                    "name" : data.name,
                    "username" : data.username,
                    "address" : data.address || "",
                    "orders" : {
                        url : `/admin/orders/${data.id}`,
                        text: "View Orders",
                        type : TableObjectType.LINK
                    }
                }
            })}
            deleteURL="admin/deleteUser"
            editButton={false}
            />
        </div>
    )
}

export default Users;