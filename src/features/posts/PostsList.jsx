import { useSelector } from "react-redux";
import { selectPostsIds } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useGetPostsQuery } from "./postsSlice";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const orderedPostsIds = useSelector(selectPostsIds);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = orderedPostsIds.map((postId) => (
      <PostsExcerpt postId={postId} key={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div className="w-full flex items-center flex-col">
      <div className="container mt-4">{content}</div>
    </div>
  );
};

export default PostsList;
