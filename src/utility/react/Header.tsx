const Header = ({title}:{title: string})=> {   
    return (
        <div className="pb-10">
            <h1 className="text-3xl text-center text-primary">
                {title}
            </h1>
        </div>
    )
}

export default Header;