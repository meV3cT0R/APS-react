import { Dispatch, SetStateAction, createContext } from "react";

import { CartItem } from "./types/Cart";

export const GlobalContext = createContext<{
    cart : CartItem[],
    setCart :  Dispatch<SetStateAction<CartItem[]>>
}>({
    cart : [],
    setCart : {} as Dispatch<SetStateAction<CartItem[]>>
});