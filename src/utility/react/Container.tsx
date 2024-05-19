import { ReactNode } from "react";

const Container = ({children} : {children:ReactNode})=> {
    return <div className="my-10 py-10">
                {children}
        </div>
}

export default Container;