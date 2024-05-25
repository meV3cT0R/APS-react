import { Outlet, useLoaderData } from "react-router-dom";
import TableWithPagination from "../../../components/admin/TableWithPagination";

const Category = ()=> {

    const res = useLoaderData();
    return <>
    <div className="space-y-10">
        <Outlet/>

        <TableWithPagination 
            columns={["name","image"]}
            avoidColumns={["id"]}
            datas={res && (res as any).data.map((data:any)=> {
                return {
                    "id" : data.id,
                    "name" : data.name,
                    "image" : data.image
                }
            })}
        />
    </div>
    </>
}

export default Category;