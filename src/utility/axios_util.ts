import axios from "axios";

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