import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("https://bistro-boss-server-one-hazel.vercel.app/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <section className="my-20">
            <SectionTitle
                heading={"TESTIMONIALS"}
                subHeading={"What Our Clients Say"}
            />

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review =>
                        <SwiperSlide key={review._id}>
                            <div className="mx-24 my-16 flex flex-col items-center space-y-2">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <h3 className="text-2xl text-orange-400">{review.name}</h3>

                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
};

export default Testimonials;