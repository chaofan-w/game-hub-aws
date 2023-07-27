import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiurl = import.meta.env.VITE_APP_API_URL;
// import Joi from "joi";

// const validateUser = (user) => {
//   const schema = Joi.object({
//     firstName: Joi.string().min(3).max(50),
//     lastName: Joi.string().min(3).max(50),
//     username: Joi.string().min(3).max(50),
//     email: Joi.string().min(3).max(255).email(),
//     country: Joi.string().min(3).max(50),
//     password: Joi.string().min(3).max(255),
//     gameLibrary: Joi.array().items(Joi.number().min(1).max(999)),
//   });
//   return schema.validate(user);
// };

const initialState = {
  status: null,
  user: null,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiurl}/api/users/me`, {
        headers: {
          "x-auth-token": token,
        },
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ token, updateContent }, { rejectWithValue }) => {
    // const { error } = validateUser(updateContent);
    // if (error) {
    //   return rejectWithValue(error.details[0].message);
    // }
    try {
      const response = await axios.patch(
        `${apiurl}/api/users/update`,
        updateContent,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err); // Log the error for debugging
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message || "Unknown error");
      }
    }
  }
);

export const addRentals = createAsyncThunk(
  "users/addRentals",
  async ({ token, gamesInCart }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiurl}/api/rentals/open`,
        { gamesInCart: gamesInCart },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err); // Log the error for debugging
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message || "Unknown error");
      }
    }
  }
);

export const deleteRentals = createAsyncThunk(
  "users/deleteRentals",
  async ({ token, gamesToDelete }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiurl}/api/rentals/open`, {
        data: { gamesToDelete: gamesToDelete },

        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (err) {
      console.log(err); // Log the error for debugging
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message || "Unknown error");
      }
    }
  }
);

export const automaticCloseRentals = createAsyncThunk(
  "users/automaticCloseRentals",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiurl}/api/rentals/open/automatic`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err); // Log the error for debugging
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message || "Unknown error");
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "users/userRegister",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiurl}/api/users/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      } else {
        return rejectWithValue(err.message || "Unknown error");
      }
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.status = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.user = null;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(addRentals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRentals.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(addRentals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(deleteRentals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRentals.fulfilled, (state) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(deleteRentals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { clearUser } = usersSlice.actions;
export const selectUserState = (state) => state.users;
export default usersSlice.reducer;
