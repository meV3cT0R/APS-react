import { Dispatch, SetStateAction, createContext } from "react";

import { CartItem } from "./types/Cart";

export const GlobalContext = createContext<{
    cart : CartItem[],
    setCart :  Dispatch<SetStateAction<CartItem[]>>,
    token : string | null,
    setToken : Dispatch<SetStateAction<string |null>>,
    user : any,
    setUser : Dispatch<SetStateAction<any>>
}>({
    cart : [],
    setCart : {} as Dispatch<SetStateAction<CartItem[]>>,
    token : "",
    setToken : {} as Dispatch<SetStateAction<string | null>>,
    user : "",
    setUser : {} as Dispatch<SetStateAction<string | null>>
});