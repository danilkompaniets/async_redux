import { useSelector } from "react-redux";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
  const users = useSelector(selectAllUsers);
  // +
  const post = useSelector((state) => selectPostById(state, postId));

  let author = users.find((user) => user.id == post.userId);

  if (!author) {
    author = "Unknown author";
  }

  return (
    <article className="px-4 py-2 flex flex-col border text-black border-neutral-500 rounded-md mb-5 gap-y-3">
      <h3 className="text-2xl">{post.title}</h3>
      <p className="text-xl">{post.body.substring(0, 75)}</p>
      <div className="flex gap-x-2">
        <p>{author.name}</p>
        <TimeAgo timestamp={post.date} />
      </div>
      <Link to={`post/${post.id}`}>View post</Link>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
