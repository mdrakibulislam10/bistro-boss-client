import FoodCard from "../../../components/FoodCard/FoodCard";
import { useState } from 'react';
import ReactPaginate from 'react-paginate';


const OrderTab = ({ items }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };


    return (
        <>
            <div className="grid md:grid-cols-3 gap-5">

                {
                    items
                        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                        .map(item =>
                            <FoodCard
                                key={item._id}
                                item={item}
                            />
                        )
                }
            </div>
            <ReactPaginate
                previousLabel={'⬅️Previous'}
                nextLabel={'Next➡️'}
                breakLabel={'...'}
                pageCount={Math.ceil(items.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                className="flex gap-8 justify-end me-2"
            />
        </>
    );
};

export default OrderTab;