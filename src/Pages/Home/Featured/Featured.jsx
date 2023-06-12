import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed">
            <SectionTitle
                heading={"FROM OUR MENU"}
                subHeading={"Check it out"}
            />

            <div className="md:flex justify-center items-center gap-6 px-36 py-12">
                <div>
                    <img src={featuredImg} alt="" />
                </div>

                <div className="space-y-2">
                    <p>Aug 20, 2029</p>
                    <p>WHERE CAN I GET SOME?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, quidem. Quidem id adipisci tempora assumenda non voluptate exercitationem reiciendis saepe. Temporibus, fugiat suscipit earum vitae facilis aperiam aut qui est.</p>
                    <button className="btn bg-transparent border-b-2 border-0">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;