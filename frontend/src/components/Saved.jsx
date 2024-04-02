import ImageCard from "./ImageCard";

const Saved = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        <div className="mt-10 w-full max-w-7xl p-5 pb-10 mx-auto mb-10 gap-5 gap-y-4 columns-2 md:columns-3 lg:columns-4">
          {posts.length > 0 &&
            posts.map((post) => (
              <ImageCard
                key={post._id}
                id={post.post._id}
                imageUrl={post.post.imageUrl}
                title={post.post.title}
                description={post.post.description}
                username={post.post.user.username}
              />
            ))}
        </div>
      ) : (
        <div className="mx-auto mt-10 font-bold sm:text-xl md:text-3xl">
          Looks like you haven't saved any posts yet
        </div>
      )}
    </div>
  );
};

export default Saved;
