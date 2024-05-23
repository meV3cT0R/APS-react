const Button = ({ text }: { text?: string }) => {
    return (
        <button type="submit" 
        className="mt-10 text-xl border-2 border-primary px-5 py-2  rounded text-primary hover:bg-primary hover:text-white duration-300">
            {text || "Submit"}
        </button>
    )
}

export default Button;