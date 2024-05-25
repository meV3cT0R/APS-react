import { useLoaderData } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";
import FAB from "../../../components/utility/FAB";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminProducts = ()=> {
    const res= useLoaderData();


    return (
        <div>

            <TableWithPagination
                    columns={["name","category","price"]}
                    avoidColumns={["id"]}
                    datas={res && (res as any).data.map((data :any)=> {
                        return {
                            "id" : data.id,
                            "name" : data.name,
                            "cat" : data.category,
                            "price" : data.price
                        }
                    })}
            />
            <FAB style="bottom-10 right-10" to="add" icon={faPlus}/>
        </div>
    )
}

export default AdminProducts;