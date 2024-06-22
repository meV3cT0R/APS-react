import { useLoaderData } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";
import FAB from "../../../components/utility/FAB";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminProducts = ()=> {
    const res= useLoaderData();

    console.log(res);
    return (
        <div>

            <TableWithPagination
                    columns={["name","category","price","specs"]}
                    avoidColumns={["id"]}
                    datas={res && (res as any).data.map((data :any)=> {
                        return {
                            "id" : data.id,
                            "name" : data.aname?.name || "",
                            "cat" : data.category.name,
                            "price" : data.aname?.price || "",
                            "specs" : JSON.stringify(data.specs),
                            
                        }
                    })}
                    deleteURL="admin/deleteProduct"
                    afterDeletePath="/admin/products"
            />
            <FAB style="bottom-10 right-10" to="add" icon={faPlus}/>
        </div>
    )
}

export default AdminProducts;