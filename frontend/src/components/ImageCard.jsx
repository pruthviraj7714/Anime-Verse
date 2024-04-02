import { Link } from "react-router-dom";

const ImageCard = ({ id, imageUrl, title, username }) => {
  return (
    <Link to={`/image/${id}`} className="relative group block mb-4">
      <div className="border border-black shadow-md relative">
        <img src={imageUrl} alt={title} className="object-cover" />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity"></div>

        <div className="absolute bottom-0 left-0 p-2 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center">
            <div className="flex justify-center items-center h-8 w-8 rounded-full text-black bg-gray-200 mr-2">
              {username && username[0].toUpperCase()}
            </div>
            <div className="font-medium text-md">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
