import { useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../../components/navbar/BrandLogo";
import Button from "../../components/form/Button";

const Invoice = () => {
    const { state } = useLocation();
    const date = new Date(state.checkedOutDate);
    const navigate = useNavigate();
    return (
        <div className="max-w-[800px] mx-auto space-y-5 py-20 px-10 border-2 shadow my-20">


            <div className="flex  justify-between items-center ">
                <BrandLogo className={""} />

                <div>
                    <h1 className="text-xl"> Autoparts Shop</h1>
                    <p className="text-lg text-gray-500"> Lokanthali,Bhaktapur </p>
                </div>
            </div>

            <div className="flex justify-between">
                <div>
                    <h1 className="font-bold text-xl"> Bill To</h1>
                    <p className="text-gray-500 text-lg">{state.users.name}</p>
                    <p className="text-gray-500 text-lg">{state.users.address}</p>
                </div>
                <div>
                    <h1 className="font-bold text-xl"> Invoice </h1>
                    <p className="text-gray-500 text-lg"> {state.id}</p>
                    <h1 className="font-bold text-xl"> Date</h1>
                    <p className="text-gray-500 text-lg"> {`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}</p>
                </div>
            </div>

            <div className=" mx-auto  bg-white shadow-md rounded-lg">
                
                <table className="min-w-full bg-white border border-gray-300 space-y-5">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-lg font-semibold text-gray-700">Item</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-right text-lg font-semibold text-gray-700">Quantity</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-right text-lg font-semibold text-gray-700">Unit Price</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-right text-lg font-semibold text-gray-700">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.cartItems.map(item=> {
                                return <tr className="text-lg">
                                <td className="py-2 px-4 border-b border-gray-200">{item.part.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-right">{item.quantity}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-right">Nrs. {item.part.price}</td>
                                <td className="py-2 px-4 border-b border-gray-200 text-right">Nrs. {item.part.price * item.quantity}</td>
                            </tr>
                            })
                        }
                        
                        
                    </tbody>
                    <tfoot className="text-md">
                        <tr className="">
                            <td colSpan={3} className="py-2 px-4 text-right font-bold text-lg">Subtotal</td>
                            <td className="py-2 px-4 text-right text-lg">Nrs. {state.totalCost}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-2 px-4 text-right font-bold text-lg">Tax (13%)</td>
                            <td className="py-2 px-4 text-right text-lg">Nrs. {(state.totalCost * (13/100))}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-2 px-4 text-right font-bold text-lg">Total</td>
                            <td className="py-2 px-4 text-right text-lg">Nrs. {state.totalCost + (state.totalCost * (13/100))} </td>
                        </tr>
                    </tfoot>
                </table>


            </div>
            <div className="flex justify-end">
                    <Button text="browse more products" onClick={()=>navigate("/products")}/>
                </div>
        </div>
    )
}

export default Invoice;