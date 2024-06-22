import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Send, ShoppingCart } from "@mui/icons-material";
import { GlobalContext } from "../../GlobalContext";
import { CartItem } from "../../types/Cart";
import { imageURL } from "../../utility/constants";
import { axiosPostJsonData } from "../../utility/axios_util";
import Swal from "sweetalert2";

const ProductInfo = () => {
    const { token, user, cart, setCart,setUser } = useContext(GlobalContext);

    const navigate = useNavigate();

    const data = useLoaderData();

    const [imgIdx, setImgIdx] = useState(0);
    const product = data.data;

    if (!product) return;

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, [])
    return (
        <div className=" px-32 py-10 ">
            <div className=" flex shadow-xl">
                <div className="flex flex-col  px-10 py-10 flex-2">
                    <div>
                        <img src={imageURL + product.images[imgIdx]} className="object-cover w-[500px] h-[500px] rounded-lg" />
                    </div>
                    <div className="flex flex-grow">

                    </div>
                    <div className="flex  overflow-x-scroll">
                        {product.images.map((img, i) => {
                            return <img
                                src={imageURL + img}
                                className={`w-[100px] h-[100px] object-cover border-4 cursor-pointer ${imgIdx == i ? " border-primary" : ""}`}

                                onClick={() => {
                                    setImgIdx(i);
                                }}
                            />
                        })}
                    </div>
                </div>

                <div className="flex flex-col space-y-7  pt-10 flex-1 border">
                    <div className="px-10">
                        <h1 className="text-3xl capitalize ">{product.aname.name} </h1>
                        <p className="text-xl text-gray-500 "> Nrs. {product.aname.price} </p>
                    </div>

                    <div className="space-x-5 py-10 bg-gray-100 px-10">
                        <button
                            className="border-2  capitalize border-primary text-primary hover:bg-primary hover:text-white hover:bg-primary rounded px-3 py-2"
                            onClick={() => {
                                const val: CartItem | undefined = cart.find(c => c.id == product.id);
                                if (!val)
                                    setCart([...cart, { ...product, quantity: 1 }]);
                                else {
                                    setCart(cart.map(v => {
                                        if (v.id == val.id)
                                            return {
                                                ...val,
                                                quantity: val.quantity + 1
                                            }
                                        return v;
                                    }))
                                }
                                navigate("/cart");
                            }}
                        >
                            <ShoppingCart className="" /> <span>Add to Cart</span>
                        </button>
                        <button
                            className="border-2  capitalize border-primary text-primary hover:bg-primary hover:text-white hover:bg-primary rounded px-3 py-2"
                            onClick={() => {
                                Swal.fire({
                                    title : "Do you want to buy this item?",
                                    showCancelButton : true,
                                    showConfirmButton : true,
                                    confirmButtonText : "Yes",
                                    cancelButtonText : "No"
                                }).then((result) => {
                                    if (result.isConfirmed && token && user) {
                                        const val: CartItem | undefined = cart.find(c => c.id == product.id);
                                        let cartItems = [];
                                        if (!val)
                                            cartItems = [...cart.map(c => {
                                                return {
                                                    quantity: c.quantity,
                                                    productId: c.id,
                                                }
                                            }), { productId: product.id, quantity: 1 }];
                                        else
                                            cartItems = cart.map(v => {
                                                if (v.id == val.id)
                                                    return {
                                                        productId: val.id,
                                                        quantity: val.quantity + 1
                                                    }
                                                return {
                                                    quantity: v.quantity,
                                                    productId: v.id,
                                                };
                                            })

                                        axiosPostJsonData("/user/checkOutItems", {
                                            cartItems: cartItems
                                        }, token).then(res => {
                                            Swal.fire({
                                                icon: "success",
                                                text: "Thank you for purchasing",
                                            })
                                            navigate("/invoice", {
                                                state: res.data
                                            })
                                            setUser({
                                                ...user,
                                                orders :[...user.orders,res.data]
                                            })
                                            setCart([]);
                                        }).catch(err => Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: err,
                                        }));
                                    }
                                    else
                                        navigate("/login");
                                })

                            }}
                        >
                            <Send className="" /> <span>Buy now</span>
                        </button>
                    </div>

                    <div className="px-10 space-y-5">
                        <h1 className="font-bold text-2xl"> Specifications</h1>
                        <table className="min-w-full bg-white border border-gray-200">
                            <tbody className="divide-y divide-gray-200">


                                {Object.keys(product.specs).map(key => {
                                    return (
                                        <tr >
                                            <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                                                {key}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xl">
                                                {product.specs[key]}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductInfo;