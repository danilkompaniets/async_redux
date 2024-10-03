import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return [...response.data];
});

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        const data = action.payload;
        state.posts.push(data);
      },
      prepare(title, body, userId) {
        const preparedData = {
          body: body,
          date: new Date().toISOString(),
          id: nanoid(),
          reactions: {
            thumbsUp: 0,
            hearts: 0,
            wow: 0,
            rocket: 0,
          },
          title: title,
          userId: userId,
        };
        return {
          payload: preparedData,
        };
      },
    },

    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post && post.reactions[reaction] !== undefined) {
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

        const uniquePosts = loadedPosts.filter(
          (newPost) =>
            !state.posts.some((existingPost) => existingPost.id === newPost.id)
        );

        state.posts = state.posts.concat(uniquePosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.id = Number(state.posts.length + 1);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hearts: 0,
          wow: 0,
          rocket: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
