/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  games: [],
  status: "idle",
  error: null,
};

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ page, pageSize, filter = null }) => {
    if (page === 0) return { data: [] };
    const response = await axios.get(
      `/api/games?page=${page}&pageSize=${pageSize}${
        filter ? "&filter=" + filter : ""
      }`
    );
    const { data } = response;
    return data;
  }
);

// export const fetchSuggestions = createAsyncThunk(
//   "games/fetchSuggestions",
//   async ({ page = 1, pageSize = 12, keyword }) => {
//     if (!keyword) return { data: [] };
//     const response = await axios.get(
//       `/api/games/suggestions/${keyword}?page=${page}&pageSize=${pageSize}`
//     );
//     const { data } = response;
//     return data?.length > 0 ? data : [];
//   }
// );

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    resetGames: (state) => {
      state.games = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        const newGames = action.payload.data.filter((newGame) => {
          return !state.games.some((game) => game.id === newGame.id);
        });
        state.status = "succeeded";
        state.games = [...state.games, ...newGames];
        state.error = null;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = "you have reached the end of game list";
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const { resetGames } = gamesSlice.actions;
export default gamesSlice.reducer;
export const selectGamesState = (state) => state.games;
