const ImagePinSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 animate-pulse">
      <div className="flex items-center my-8">
        <div className="h-12 w-12 rounded-full bg-gray-300 "></div>
        <div className="h-4 w-24 max-w-24 rounded-lg ml-4 bg-gray-300" />
      </div>
      <div className="w-[400px] md:w-[450px] h-[550px] rounded-md bg-gray-300 "></div>
    </div>
  );
};

export default ImagePinSkeleton;
