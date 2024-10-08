import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hearts: "❤️",
  wow: "😱",
  rocket: "🚀",
};

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();
  return (
    <div className="flex gap-x-2">
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <button
            className="border border-neutral-400 rounded-md px-2 py-1"
            key={name}
            onClick={() => {
              const newValue = post.reactions[name]++;
              addReaction({
                postId: post.id,
                reactions: { ...post.reactions, [name]: newValue },
              });
            }}
          >
            {emoji} {post.reactions[name]}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
