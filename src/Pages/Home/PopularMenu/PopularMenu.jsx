// import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
// import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../../Menu/MenuCategory/MenuCategory";

const PopularMenu = () => {
    const [menu] = useMenu(); // arr destructuring;
    const popular = menu.filter(item => item.category === "popular");

    // const [menu, setMenu] = useState([]);
    // const [allMenu, setAllMenu] = useState([]);

    // useEffect(() => {
    //     fetch("menu.json")
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === "popular");
    //             setMenu(popularItems);
    //             setAllMenu(data);
    //         })
    // }, []);

    // const showAllMenuHandler = () => {
    //     setMenu(allMenu);
    // };

    return (
        <section>
            <SectionTitle
                heading={"FROM OUR MENU"}
                subHeading={"Check it out"}
            />

            <MenuCategory items={popular} />

            <div className="my-6">
                <button className="mx-auto btn btn-outline border-0 border-b-4 mt-4 flex">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;