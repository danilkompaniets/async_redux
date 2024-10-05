import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    try {
      initialPost = initialPost.state;
      const { id } = initialPost;

      const response = await axios.put(`${POST_URL}/${id}`, initialPost);
      return response.data;
    } catch {
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POST_URL}/${id}`);
    if (response?.status === 200) {
      return initialPost;
    }
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.entities[postId];
      if (post) {
        post.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;

        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hearts: 0,
            wow: 0,
            rocket: 0,
          };
          return post;
        });

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.id = Number(state.ids.length + 1);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hearts: 0,
          wow: 0,
          rocket: 0,
        };

        console.log(action.payload);

        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update failed");
          console.log(action.payload);
          return;
        }

        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        postsAdapter.removeOne(state, action.payload.id);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => postsAdapter((post) => post.userId == userId)
);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
