import { noImage } from "../../utility/constants";

const ProductCard = ({img,title,price} : {img:string,title:string,price:number})=> {
    return <div className="px-3 py-5 flex flex-col hover:shadow-xl duration-500 cursor-pointer rounded-lg group">
            <img src={img || noImage} alt={title} className="w-[200px] h-[300px] object-cover self-center scale-2 group-hover:scale-110 z-[-10] duration-500"/>
            <h1 className="text-lg text-gray-700 px-5"> {title} </h1>
            <p className="text-[1rem] text-gray-500 px-5"> NRs. {price} </p>
        </div>
}

export default ProductCard;