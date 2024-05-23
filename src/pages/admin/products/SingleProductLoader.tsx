import { axiosGetData } from "../../../utility/axios_util";

export default async function({params}:{params:any}) {
    return axiosGetData("getAllProducts/"+params.id).catch(err=>console.log(err));

}