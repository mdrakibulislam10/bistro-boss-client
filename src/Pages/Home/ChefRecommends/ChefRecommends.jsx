import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import ChefRecommendCard from "./ChefRecommendCard";
import FoodCard from "../../../components/FoodCard/FoodCard";

const ChefRecommends = () => {
    const [recommends, setRecommends] = useState([]);

    useEffect(() => {
        fetch("menu.json")
            .then(res => res.json())
            .then(data => {
                const recommendsItems = data.filter(item => item.category === "salad");
                setRecommends(recommendsItems.slice(0, 3));
            })
    }, []);

    return (
        <div>
            <SectionTitle
                heading={"Chef Recommends"}
                subHeading={"Should Try"}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20">
                {
                    recommends.map(item =>
                        <FoodCard
                            key={item._id}
                            item={item}
                            priceConditional={true}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default ChefRecommends;