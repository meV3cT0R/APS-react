import axios from "axios";

export async function UsersLoader() {

    return await axios
    .get("admin/getAllUsers", {
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Authorization" : "Bearer "+localStorage.getItem("token")
      },
    })
}