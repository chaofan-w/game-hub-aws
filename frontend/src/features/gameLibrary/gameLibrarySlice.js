/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  libraryGames: [],
  status: "idle",
  error: null,
};

export const fetchGameLibrary = createAsyncThunk(
  "gameLibrary/fetchGameLibrary",
  async ({ libraryPage, libraryPageSize, token }) => {
    if (libraryPage === 0) return { data: [] };
    const response = await axios.get(
      `/api/users/gameLibrary?page=${libraryPage}&limit=${libraryPageSize}`,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    const { data } = response;
    return data;
  }
);

const gameLibrarySlice = createSlice({
  name: "gameLibrary",
  initialState,
  reducers: {
    resetGameLibrary: (state) => {
      state.libraryGames = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchGameLibrary.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGameLibrary.fulfilled, (state, action) => {
        const newGames = action.payload.data.filter((newGame) => {
          return !state.libraryGames.some((game) => game.id === newGame.id);
        });
        state.status = "succeeded";
        state.libraryGames = [...state.libraryGames, ...newGames];
        state.error = null;
      })
      .addCase(fetchGameLibrary.rejected, (state, action) => {
        state.status = "failed";
        state.error = "you have reached the end of game list";
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const { resetGameLibrary } = gameLibrarySlice.actions;
export default gameLibrarySlice.reducer;
export const selectGameLibraryState = (state) => state.gameLibrary;
