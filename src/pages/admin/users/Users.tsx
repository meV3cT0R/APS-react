import { useLoaderData } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";

const Users = () => {
    const res = useLoaderData();
    console.log(res);
    return (
        <div>
            <TableWithPagination 
            columns={["name","username","address"]}
            avoidColumns={["id"]}
            datas={res && (res as any).data.map((data:any)=> {
                return {
                    "id" : data.id,
                    "name" : data.name,
                    "username" : data.username,
                    "address" : data.address || ""
                }
            })}
            editButton={false}
            />
        </div>
    )
}

export default Users;