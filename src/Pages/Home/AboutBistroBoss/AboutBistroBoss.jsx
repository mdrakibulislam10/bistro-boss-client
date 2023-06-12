import chef from "../../../assets/home/chef-service.jpg";

const AboutBistroBoss = () => {
    return (
        <div className="hero mb-20" style={{ backgroundImage: `url(${chef})`, height: "572px" }}>
            {/* <div className=""></div> */}
            <div className="hero-content text-center text-neutral-content px-5 sm:px-28">
                <div className="bg-white text-black px-8 py-4 md:px-32 md:py-24">
                    <h1 className="mb-5 text-5xl font-bold">Bistro Boss</h1>
                    <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutBistroBoss;