import { ProductType } from "../pages/Browse/ProductType";

export interface CartItem extends ProductType{
    quantity : number,
}