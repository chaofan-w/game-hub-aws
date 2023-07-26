import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  genres: [],
  status: "idle",
  error: null,
};

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  const response = await axios.get("/api/genres");
  return response.data;
});

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genres = action.payload;
      })

      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default genresSlice.reducer;
export const selectAllGenres = (state) => state.genres.genres;
