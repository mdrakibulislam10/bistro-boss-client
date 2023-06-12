import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();

    // const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`;
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const { register, handleSubmit, reset, } = useForm();
    const onSubmit = data => {
        console.log(data.image[0]);
        const formData = new FormData();
        formData.append("image", data.image[0]);

        fetch(img_hosting_url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(imgResponse => { // data
                console.log(imgResponse);
                if (imgResponse.success) { // === true;
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, category, recipe } = data; // destructuring needed prop // data obj from react hook form;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgURL }; // make obj for post // image key and value is hosting img url; price ke parseFloat kora hoyeche karon, server theke sort korar somoy jeno sothik vabe sort hote pare arki;
                    // newItem.image = imgURL;
                    console.log(newItem);

                    // fetch("", { method: "POST" });
                    axiosSecure.post("/menu", newItem) // newItem is already obj, so do not need to newItem keep in obj / option;
                        .then(data => {
                            // console.log(data.data);
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    };

    // console.log(img_hosting_token);
    // console.log(errors);

    return (
        <div className="w-full px-10">
            <SectionTitle
                subHeading={"What's new"}
                heading={"Add an item"}
            />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-2xl">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true, maxLength: 120 })} placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-2xl">Category*</span>
                            </label>
                            <select className="select select-primary w-full" defaultValue={"Pick One"} {...register("category", { required: true })}>
                                <option disabled>Pick One</option>
                                <option>pizza</option>
                                <option>soup</option>
                                <option>salad</option>
                                <option>dessert</option>
                                <option>desi</option>
                                <option>drinks</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-2xl">Price*</span>
                            </label>
                            <input type="text" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-2xl">Recipe Details*</span>
                        </label>
                        <textarea {...register("recipe", { required: true })} className="textarea" placeholder="Bio"></textarea>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-2xl">Item Image*</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input w-full" />
                    </div>

                    <button className="btn btn-sm mt-5">Add Item</button>
                </form>
            </div>
        </div >
    );
};

export default AddItem;