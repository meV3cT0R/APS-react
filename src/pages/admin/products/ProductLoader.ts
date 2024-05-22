import { axiosGetData } from "../../../utility/axios_util";

export default async function productLoader() {
    return axiosGetData("getAllProducts").catch(err=>console.log(err));
}