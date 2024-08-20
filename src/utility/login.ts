import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

export async function loginWithToken(token:string,setUser : Dispatch<SetStateAction<User |null>>) {
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
      })
}

export function logout(setUser:Dispatch<SetStateAction<User |null>>,setToken:Dispatch<SetStateAction<string | null>>) {

    setUser(null);
    setToken(null);
    localStorage.removeItem("");

    console.log("succesfully logged out");
}