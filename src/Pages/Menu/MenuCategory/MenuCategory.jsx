import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

// const MenuCategory = ({ items, title, img }) => {
const MenuCategory = ({ items, title, img }) => {
    return (
        <div className="pt-8">
            {
                title && <Cover img={img} title={title} />
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    />)
                }
            </div>
            <div className="text-center mt-5 mb-8">
                <Link to={`/order/${title}`}>
                    {/* here title is used for category name */}
                    <button className="btn border-0 border-b-2 bg-transparent text-black hover:text-white">order now</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;