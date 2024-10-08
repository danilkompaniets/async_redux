import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectUsersById } from "../users/usersSlice";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const userId = post.userId;

  const author = useSelector((state) => selectUsersById(state, userId));

  if (!post) {
    return <section>Post not found...</section>;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <article className="px-4 py-2 flex flex-col border text-black border-black rounded-md gap-y-3">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <Link to={`/post/edit/${post.id}`}>Edit this post</Link>
        <div>
          <p>{author.name}</p>
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
      </article>
    </div>
  );
};

export default SinglePostPage;
