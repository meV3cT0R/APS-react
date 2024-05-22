import axios from "axios";
import Swal from "sweetalert2";

export async function axiosGetData(url: string) {
  const res = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
}


export async function axiosPostJsonData(url: string, data: any, token: string) {
  const res = await axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        XRCorsToken: "xK3#pR*8sZ@1tYq9",
        // "type":"formData"
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  return res;
}

export async function axiosDeleteData(url:string,token:string) {
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      XRCorsToken: "xK3#pR*8sZ@1tYq9",
      // "type":"formData"
    },
  }).catch(_=>{
    Swal.fire({
      icon: "error",
      title: "something went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  });
  return res;
}