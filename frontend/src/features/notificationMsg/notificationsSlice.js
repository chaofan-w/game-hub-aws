import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: { severity: null, message: null },
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications = action.payload;
    },
    removeNotification(state) {
      state.notifications = { severity: null, message: null };
    },
  },
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
export const selectNotificationsState = (state) => state.notifications;
