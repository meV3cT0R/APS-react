import { NavLink } from "react-router-dom";
import { noImage } from "../../utility/constants";
import Container from "../../utility/react/Container";
import Header from "../../utility/react/Header"

const AutoSpareParts = () => {
    const partsTypes = [
        {
            img: "https://media.istockphoto.com/id/1170306684/photo/change-new-car-alternator-with-hand-in-the-garage-or-auto-repair-service-center-as-background.jpg?s=612x612&w=0&k=20&c=CuMoKVrzw1BdwcBZhADe-_v1WPXwJkYe1knVLCUizVw=",
            title: "Alternator",
            cat: "alternator"
        }, 
        {
            img: "https://d3hvs2gyy8n2xz.cloudfront.net/blog/wp-content/uploads/2016/03/08120056/how-do-brakes-work.jpg",
            title: "Car Braking System Parts",
            cat: "Brake parts"
        }, 
        {
            img: "",
            title: "Automobile Engine Parts",
            cat: "Engine parts"
        }, 
        {
            img: "",
            title: "Automobile Suspension Parts",
            cat: "Alternator"
        },
        {
            img: "",
            title: "Car Mirrors",
            cat: "Alternator"
        },
    ]
    return (
        <Container>
            <div className="">
                <Header title="Automobile Spare Parts"/>
                <div className="grid grid-cols-4 gap-4 ">
                    {partsTypes.map(type=> {
                        return <NavLink 
                                to={"/products/?cat="+type.cat}
                                className="flex flex-col items-center cursor-pointer">
                                <img className="border-2 h-[300px] object-cover" src={type.img || noImage} alt={type.title}/>
                                <h1 className="text-xl font-bold text-gray-500"> {type.title}</h1>
                            </NavLink>
                    })}
                </div>
            </div>
        </Container>
    )
}

export default AutoSpareParts;