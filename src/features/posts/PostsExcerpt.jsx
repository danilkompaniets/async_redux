import { useSelector } from "react-redux";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { selectPostById } from "./postsSlice";
import { selectUsersById, useGetUsersQuery } from "../users/usersSlice";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  const author = useSelector((state) => selectUsersById(state, post.userId));

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
