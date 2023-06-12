import orderCover from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../hooks/useMenu";
// import FoodCard from "../../../components/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
    const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
    const { category } = useParams();
    // console.log(category);
    const initialIndex = categories.indexOf(category);
    // console.log(initialIndex);

    const [tabIndex, setTabIndex] = useState(initialIndex); // by default tab selected with index num
    const [menu] = useMenu();
    // console.log(menu);

    const salad = menu.filter(item => item.category === "salad");
    const pizza = menu.filter(item => item.category === "pizza");
    const soup = menu.filter(item => item.category === "soup");
    const dessert = menu.filter(item => item.category === "dessert");
    const drinks = menu.filter(item => item.category === "drinks");

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order</title>
            </Helmet>

            <Cover img={orderCover} title={"order food"} />

            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                {/* defaultIndex: Which tab will be show by default | Arrow func have by default index num | index is tab num. started with 0 */}
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;