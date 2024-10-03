import { useSelector } from "react-redux";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { selectAllUsers } from "../users/usersSlice";

const PostsExcerpt = ({ post }) => {
  const users = useSelector(selectAllUsers);

  let author = users.find((user) => user.id == post.userId);

  if (!author) {
    author = "Unknown author";
  }

  return (
    <article className="px-4 py-2 flex flex-col border text-white border-white rounded-md mb-5 gap-y-3">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div>
        <p>{author.name}</p>
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostsExcerpt;
