import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    console.log(orderedPosts);

    content = orderedPosts.map((post) => (
      <PostsExcerpt post={post} key={post.id} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {content}
    </div>
  );
};

export default PostsList;
