import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === "dessert");
    const soup = menu.filter(item => item.category === "soup");
    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            {/* menu page cover */}
            <Cover img={menuImg} title={"our menu"} />

            {/* offer section / offered menu items */}
            <SectionTitle heading={"today's offer"} subHeading={"Don't miss"} />
            <MenuCategory items={offered} />

            {/* dessert section / dessert menu items */}
            <MenuCategory
                items={dessert}
                title={"dessert"}
                img={dessertImg}
            />

            {/* pizza section / pizza menu items */}
            <MenuCategory
                items={pizza}
                img={pizzaImg}
                title={"pizza"}
            />

            {/* salads section / salads menu items */}
            <MenuCategory
                items={salad}
                img={saladImg}
                title={"salad"}
            />

            {/* soups section / soups menu items */}
            <MenuCategory
                items={soup}
                img={soupImg}
                title={"soup"}
            />
        </div>
    );
};

export default Menu;