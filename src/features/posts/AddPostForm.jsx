import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAddNewPostMutation } from "./postsSlice";

import { useGetUsersQuery } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "title": {
      return {
        title: action.payload,
        body: state.body,
        userId: state.userId,
      };
    }
    case "body": {
      return {
        title: state.title,
        body: action.payload,
        userId: state.userId,
      };
    }
    case "userId": {
      return {
        title: state.title,
        body: state.body,
        userId: action.payload,
      };
    }
  }
};
const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: users } = useGetUsersQuery();

  const [state, dispatchForm] = useReducer(reducer, {
    title: "",
    body: "",
    userId: "",
  });

  const canSave = state.body && state.title && state.userId && !isLoading;

  const onAddPostClicked = async () => {
    try {
      if (canSave) {
        await addNewPost({
          title: state.title,
          body: state.body,
          userId: state.userId,
        }).unwrap();

        navigate("/");
      }
    } catch (e) {
      console.log("failed to save the post: " + e);
    }
  };

  return (
    <div className="flex flex-col gap-y-2 w-[400px]">
      <input
        className="bg-neutral-200 mt-2 rounded-md py-1 px-2"
        type="text"
        placeholder="title"
        onChange={(e) =>
          dispatchForm({ type: "title", payload: e.target.value })
        }
      />
      <textarea
        className="bg-neutral-200 mt-2 rounded-md py-1 px-2"
        type="text"
        placeholder="body"
        onChange={(e) =>
          dispatchForm({ type: "body", payload: e.target.value })
        }
      />

      <select
        className="bg-neutral-200 mt-2 rounded-md py-1 px-2"
        id="postAuthor"
        onChange={(e) =>
          dispatchForm({ type: "userId", payload: e.target.value })
        }
      >
        <option></option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button
        className="bg-neutral-300 rounded-md py-2 px-2"
        onClick={() => {
          dispatch(onAddPostClicked);
        }}
      >
        Add post
      </button>
    </div>
  );
};

export default AddPostForm;
