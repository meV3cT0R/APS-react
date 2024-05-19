import { useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ()=> {
    const searchRef = useRef<HTMLFormElement>(null);
    const butRef = useRef<HTMLButtonElement>(null);

    return <form className="flex items-end border-b-2 duration-300" ref={searchRef}>
    <input
        type="text" className="  px-3 py-2 outline-none focus:outline-none  w-full max-w-[500px] duration-300"
        placeholder="Search...."
        onFocus={() => {
            if (searchRef.current)
                searchRef.current.classList.add("border-b-primary")
            if (butRef.current)
                butRef.current.classList.add("text-primary")
        }}

        onBlur={() => {
            if (searchRef.current)
                searchRef.current.classList.remove("border-b-primary")
            if (butRef.current)
                butRef.current.classList.remove("text-primary")
        }}
    />
    <button className="hover:text-primary duration-300" ref={butRef}> <SearchIcon /> </button>
</form>
}

export default SearchBox;