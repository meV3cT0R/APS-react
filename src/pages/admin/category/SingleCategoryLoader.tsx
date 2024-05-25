import { axiosGetData } from "../../../utility/axios_util";

export async function SingleCategoryLoader({params}) {
    return await axiosGetData(`getCategories/${params.id}`)
}