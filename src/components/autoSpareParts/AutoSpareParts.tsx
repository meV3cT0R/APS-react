import { NavLink } from "react-router-dom";
import { imageURL, noImage } from "../../utility/constants";
import Container from "../../utility/react/Container";
import Header from "../../utility/react/Header"
import { useEffect, useState } from "react";
import { axiosGetData } from "../../utility/axios_util";

const AutoSpareParts = () => {
    const [partsTypes,setPartsTypes] = useState<any[] | null>(null);

    useEffect(()=> {
        const func = async ()=> {
                axiosGetData("getCategories").then(val=> {
                    console.log(val.data);
                    setPartsTypes(val.data);
                }).catch(err=>console.log(err));
        }

        func();
    },[])
    
    if(!partsTypes) return "Loading...";
    return (
        <Container>
            <div className="">
                <Header title="Automobile Spare Parts"/>
                <div className="grid grid-cols-4 gap-4 ">
                    {partsTypes.map(type=> {
                        return <NavLink 
                                to={"/products/?cat="+type.name}
                                className="flex flex-col items-center cursor-pointer">
                                <img className="border-2 h-[300px] object-cover" src={type.image.startsWith("http") && type.image || imageURL+type.image || noImage} alt={type.title}/>
                                <h1 className="text-xl font-bold text-gray-500"> {type.name}</h1>
                            </NavLink>
                    })}
                </div>
            </div>
        </Container>
    )
}

export default AutoSpareParts;