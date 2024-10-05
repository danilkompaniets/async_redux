import { useSelector } from "react-redux";
import { getPostsStatus, getPostsError, selectPostsIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const orderedPostsIds = useSelector(selectPostsIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  console.log(orderedPostsIds)

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt postId={postId} key={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div className="w-full flex items-center flex-col">
      <div className="container mt-4">{content}</div>
    </div>
  );
};

export default PostsList;
