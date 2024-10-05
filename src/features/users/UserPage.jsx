import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) => {
    selectPostsByUser(state, Number(userId));
  });

  console.log(postsForUser)

  console.log(postsForUser);

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <div>
      <h2>{user.name}</h2>
      {postTitles}
    </div>
  );
};

export default UserPage;
