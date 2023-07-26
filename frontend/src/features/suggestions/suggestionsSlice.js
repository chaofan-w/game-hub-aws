import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  suggestions: [],
  status: "idle",
  error: null,
};

export const fetchSuggestions = createAsyncThunk(
  "suggestions/fetchSuggestions",
  async ({ page = 1, pageSize = 12, keyword }) => {
    if (!keyword) return { data: [] };
    const response = await axios.get(
      `/api/games/suggestions/${keyword}?page=${page}&pageSize=${pageSize}`
    );
    const { data } = response;
    return data;
  }
);

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    resetSuggestions: (state) => {
      state.suggestions = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action.payload.data || action.payload.data.length === 0) {
          state.suggestions = [];
        } else {
          state.suggestions = action.payload.data.map((game) => {
            return { id: game.id, name: game.name };
          });
        }
        state.error = null;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
export const selectSuggestions = (state) => state.suggestions.suggestions;
