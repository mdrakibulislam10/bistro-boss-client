
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="mx-auto text-center md:w-3/12 my-8">
            <p className="text-yellow-600">---{subHeading}---</p> {/* --- just string */}
            <h3 className="text-3xl uppercase border-y-4 py-3 mt-3">{heading}</h3>
        </div>
    );
};

export default SectionTitle;