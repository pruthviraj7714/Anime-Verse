import image1 from "../assets/home1.jpg";
import image2 from "../assets/home2.jpg";
import image3 from "../assets/home3.jpg";
import image4 from "../assets/home4.jpg";
import image5 from "../assets/home5.jpg";
import image6 from "../assets/home6.jpg";
import image7 from "../assets/home7.jpg";

const AuthImages = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-3">
      <div className="border border-black shadow-lg p-4 columns-3 md:max-w-lg lg:max-w-xl gap-y-5">
        <img src={image1} alt="//" className=" mb-3   object-cover" />
        <img src={image2} alt="//" className=" mb-3  object-cover" />
        <img src={image3} alt="//" className=" mb-3 object-cover" />
        <img src={image4} alt="//" className=" mb-3  object-cover" />
        <img src={image5} alt="//" className=" mb-3  object-cover" />
        <img src={image6} alt="//" className=" mb-3  object-cover" />
        <img src={image7} alt="//" className=" mb-3  object-cover" />
      </div>
    </div>
  );
};

export default AuthImages;
