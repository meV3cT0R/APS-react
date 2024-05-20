import { useContext } from "react";
import Container from "../../utility/react/Container";
import Wrapper from "../../utility/react/Wrapper";
import { GlobalContext } from "../../GlobalContext";
import { Link } from "react-router-dom";
import LinkButton from "../../utility/react/LinkButton";
import { Add, PlusOne, Remove } from "@mui/icons-material";

const Cart = () => {
    const { cart, setCart } = useContext(GlobalContext);
    const columns = ["description", "price", "quantity", "remove"];
    return (
        <Container>
            <Wrapper >
                <div className="space-y-10">
                    <h1 className="text-5xl font-bold text-primary text-center"> My Shopping Cart</h1>
                    <div className="border rounded-lg shadow-lg box-border py-10 min-h-[400px] relative">
                        <div className=" text-lg text-center px-32 flex flex-col min-h-[400px] justify-between space-y-10">
                            {
                                cart.length == 0 && <div className="flex flex-col items-center space-y-5  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div>
                                        <h1 className="py-5">
                                            No Item in The Cart
                                        </h1>
                                    </div>
                                    <div>
                                        <Link
                                            to="/products"
                                            className="px-20 py-5 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg duration-300"
                                        >
                                            View Products
                                        </Link>
                                    </div>
                                </div> ||
                                <>
                                    <table className="table-auto border-collapse w-full ">
                                        <thead>
                                            <tr>
                                                {columns.map(col => {
                                                    return <th key={`${col}123123123`} className="px-4 py-10  capitalize">{col}</th>

                                                })}


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((c) => {
                                                return (
                                                    <tr key={JSON.stringify(c)} className="odd:bg-gray-100 border-b ">
                                                        <td className="px-4 py-10 ">{c.name}</td>
                                                        <td className="px-4 py-10  ">
                                                            {c.price}
                                                        </td>
                                                        <td className="px-4 py-10 flex items-center justify-center">
                                                            <button 
                                                            className="flex w-[25px] h-[25px] bg-primary text-white items-center"
                                                            onClick={()=> {
                                                                setCart(cart.map(v=> {
                                                                    if(v.id == c.id && c.quantity>1) 
                                                                        return {
                                                                            ...c,
                                                                            quantity : c.quantity-1
                                                                        }
                                                                    return v;
                                                                }))
                                                            }}
                                                            >
                                                                <Remove className=""/>
                                                            </button>

                                                            <div className="w-[25px] h-[25px] border-2 flex items-center justify-center"><div className="">{c.quantity}</div></div>


                                                            <button 
                                                            className="flex w-[25px] h-[25px] bg-primary text-white items-center"
                                                            onClick={()=> {
                                                                setCart(cart.map(v=> {
                                                                    if(v.id == c.id) 
                                                                        return {
                                                                            ...c,
                                                                            quantity : c.quantity+1
                                                                        }
                                                                    return v;
                                                                }))
                                                            }}
                                                            >
                                                                <Add className="" />
                                                            </button>
                                                        </td>
                                                        <td className="px-4 py-10  "> <button
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setCart(cart.filter(crt => crt.id != c.id))
                                                            }}>[x]</button></td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>

                                    <div className="flex justify-end">
                                        <div className="border-2 px-5 py-7 flex justify-between w-[400px]">
                                            <div className="text-gray-800">
                                                Total
                                            </div>
                                            <div>
                                                {
                                                    cart.map(c => c.quantity * c.price).reduce((a, b) => a + b, 0)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <LinkButton text="Continue Shopping" to="/products" className="w-[400px]" />
                                        <LinkButton text="Checkout" to="/products" className="w-[400px]" />

                                    </div>
                                </>
                            }


                        </div>


                    </div>
                </div>
            </Wrapper>
        </Container>
    )
}

export default Cart;