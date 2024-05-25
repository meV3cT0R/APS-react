import { axiosGetData } from "../../../utility/axios_util";

export async function CategoryLoader() {
    return axiosGetData("getCategories");
}