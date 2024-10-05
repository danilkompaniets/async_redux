import { useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const reducer = (state, action) => {
  switch (action.type) {
    case "title": {
      return {
        ...state,
        title: action.payload,
      };
    }
    case "body": {
      return {
        ...state,
        body: action.payload,
      };
    }
    case "userId": {
      return {
        ...state,
        userId: action.payload,
      };
    }
    default:
      return state;
  }
};

const EditPostForm = () => {
  const { postId } = useParams();
  console.log(postId);
  const post = useSelector((state) => selectPostById(state, postId));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const [updateRequestStatus, setUpdateRequestStatus] = useState("idle");
  const [state, dispatchForm] = useReducer(reducer, {
    title: post.title,
    body: post.body,
    userId: post.userId,
    id: post.id,
    date: new Date().toISOString(),
    reactions: {
      thumbsUp: 0,
      hearts: 0,
      wow: 0,
      rocket: 0,
    },
  });

  if (!post) {
    return <div>Not Found...</div>;
  }

  const canSave =
    state.body && state.title && state.userId && updateRequestStatus === "idle";

  const onSavePostClicked = async () => {
    try {
      console.log(state);
      if (canSave) {
        setUpdateRequestStatus("pending");
        await dispatch(updatePost({ state })).unwrap();
        navigate(`/post/${postId}`);
      }
    } catch (e) {
      console.log("failed to save the post: " + e);
    } finally {
      setUpdateRequestStatus("idle");
    }
  };

  const onDeletePostClicked = async () => {
    try {
      setUpdateRequestStatus("pending");
      dispatch(deletePost({ id: state.id })).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateRequestStatus("idle");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-2 container mx-auto">
        <input
          className="bg-neutral-200 mt-2 rounded-md py-1 px-2"
          type="text"
          placeholder="title"
          defaultValue={state.title}
          onChange={(e) =>
            dispatchForm({ type: "title", payload: e.target.value })
          }
        />
        <textarea
          className="bg-neutral-200 mt-2 rounded-md py-1 px-2"
          placeholder="body"
          defaultValue={state.body}
          onChange={(e) =>
            dispatchForm({ type: "body", payload: e.target.value })
          }
        />

        <select
          className="bg-neutral-200 mt-2 rounded-md py-1 px-2"
          id="postAuthor"
          defaultValue={state.userId}
          onChange={(e) =>
            dispatchForm({ type: "userId", payload: e.target.value })
          }
        >
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          className="bg-neutral-300 rounded-md py-2 px-2"
          onClick={onSavePostClicked} // Call the function directly
        >
          Save changes
        </button>
        <button
          className="bg-red-500 rounded-md py-2 px-2"
          onClick={onDeletePostClicked} // Call the function directly
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default EditPostForm;
