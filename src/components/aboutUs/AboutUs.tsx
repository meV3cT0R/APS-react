import Container from "../../utility/react/Container";

const AboutUs = () => {
    return (
        <Container>
            <div>
                <div className="grid grid-cols-2 gap-5 ">
                    <div className="flex flex-col items-center space-y-5">
                        <h1 className="capitalize text-center text-3xl text-primary"> about Us </h1>
                        <p className="px-5 text-gray-500 text-xl">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, corporis dolores
                            soluta vel beatae eaque in laudantium perspiciatis ab magnam, animi sit voluptatibus! Molestiae,
                            deleniti sit explicabo sequi totam quisquam.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, corporis dolores
                            soluta vel beatae eaque in laudantium perspiciatis ab magnam, animi sit voluptatibus! Molestiae,
                            deleniti sit explicabo sequi totam quisquam.
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, corporis dolores
                            soluta vel beatae eaque in laudantium perspiciatis ab magnam, animi sit voluptatibus! Molestiae,
                            deleniti sit explicabo sequi totam quisquam.
                        </p>
                    </div>

                    <div className="relative">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Gilles_Panizzi.jpg"
                            className="w-full h-[400px] object-cover object-top mx-auto rounded-3xl" />
                            <div className="absolute inset-0 w-full h-full bg-black/40 rounded-3xl">

                            </div>
                    </div>
                </div>
            </div>

        </Container>

    )
}

export default AboutUs;