import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hearts: "❤️",
  wow: "😱",
  rocket: "🚀",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-x-2">
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <button
            className="border border-neutral-400 rounded-md px-2 py-1"
            key={name}
            onClick={() =>
              dispatch(addReaction({ postId: post.id, reaction: name }))
            }
          >
            {emoji} {post.reactions[name]}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
