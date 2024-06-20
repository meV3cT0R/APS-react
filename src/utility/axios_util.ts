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

export async function axiosPostDataV2(url: string, data: any, navigate: string,token:string) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key == "files"|| key=="imageList") {
      data[key].map((file:any) => {
        console.log(file);
        formData.append("imageList", file);
      })
    } else
      formData.append(key, data[key])
  })

  const res = await axios.post(url, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    }

  }).catch(error => {
    throw new Error(error);
  });

  if (res) {
    if (res.status >= 200 && res.status < 300) {
      Swal.fire({
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
    console.log(navigate);

    }
  }
  return res;
}

export async function axiosPostData(url: string, data: any,token :string) {
    return await axiosPostDataV2(url,data,"",token);
}