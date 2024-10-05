import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import PostsExcerpt from "./PostsExcerpt";

const SinglePostPage = () => {
  const { postId } = useParams();

  const users = useSelector(selectAllUsers);

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return <section>Post not found...</section>;
  }

  let author = users.find((user) => user.id == post.userId);

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
