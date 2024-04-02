import ImageCard from "./ImageCard";

const CreatedPosts = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        <div className="mt-10 w-full max-w-7xl p-5 pb-10 mx-auto mb-10 gap-5 gap-y-4 columns-2 md:columns-3 lg:columns-4">
          {posts.length > 0 &&
            posts.map((post) => (
              <ImageCard
                key={post._id}
                id={post._id}
                imageUrl={post.imageUrl}
                title={post.title}
                description={post.description}
                username={post.user.username}
              />
            ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 font-bold sm:text-xl md:text-3xl">
          Looks like you haven't posted anything yet
        </div>
      )}
    </div>
  );
};

export default CreatedPosts;
