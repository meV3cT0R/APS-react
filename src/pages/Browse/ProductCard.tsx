import { imageURL, noImage } from "../../utility/constants";

const ProductCard = ({images,aname} : {images:string[],aname : {name:string,price:number}})=> {
    return <div className="px-3 py-5 flex flex-col hover:shadow-xl duration-500 cursor-pointer rounded-lg group">
            <img src={imageURL+images[0] || noImage} alt={aname.name} className="w-[200px] h-[300px] object-contain self-center scale-2 group-hover:scale-110 z-[-10] duration-500"/>
            <h1 className="text-lg text-gray-700 px-5"> {aname.name} </h1>
            <p className="text-[1rem] text-gray-500 px-5"> NRs. {aname.price} </p>
        </div>
}

export default ProductCard;