import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export async function loginWithToken(token:string,setUser : Dispatch<SetStateAction<any>>) {
    return await axios.post("/loginWithToken", {
        token
      }, {
        headers: {
          "Accept": "*/*",
        }
      }).then(res => {
        console.log("first one : "+ res)
        if (setUser) {
          setUser(res.data)
        }
        res
      })
}

export function logout(setUser:Dispatch<SetStateAction<any>>,setToken:Dispatch<SetStateAction<string | null>>) {

    setUser(null);
    setToken(null);
    localStorage.removeItem("");

    console.log("succesfully logged out");
}