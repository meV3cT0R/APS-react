import { Dispatch, SetStateAction, createContext } from "react";

import { CartItem } from "./types/Cart";
import { User } from "./types/user";

export const GlobalContext = createContext<{
    cart : CartItem[],
    setCart :  Dispatch<SetStateAction<CartItem[]>>,
    token : string | null,
    setToken : Dispatch<SetStateAction<string |null>>,
    user : User | null,
    setUser : Dispatch<SetStateAction<User |null>>
}>({
    cart : [],
    setCart : {} as Dispatch<SetStateAction<CartItem[]>>,
    token : "",
    setToken : {} as Dispatch<SetStateAction<string | null>>,
    user : null,
    setUser : {} as Dispatch<SetStateAction<User | null>>
});