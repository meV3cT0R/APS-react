import { useLoaderData } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";

const AdminProducts = ()=> {
    const res= useLoaderData();

    console.log("admin products");
    console.log()
    return (
        <div>

            <TableWithPagination
                    columns={["name","category","price"]}
                    datas={res && (res as any).data.map((data :any)=> {
                        return {
                            "name" : data.name,
                            "cat" : data.category,
                            "price" : data.price
                        }
                    })}
            />
        </div>
    )
}

export default AdminProducts;