import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id.localeCompare(a.id),
});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (data) => usersAdapter.setAll(initialState, data),
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id: id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUsersById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

// export const selectAllUsers = (state) => state.users.users;
// export const selectUserById = (state, userId) =>
//   state.users.users.find((user) => user.id == Number(userId));
// export default usersSlice.reducer;
