import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "../features/games/gamesSlice";
import notificationsReducer from "../features/notificationMsg/notificationsSlice";
import loginReducer from "../features/login/loginSlice";
import usersReducer from "../features/users/usersSlice";
import gameLibraryReducer from "../features/gameLibrary/gameLibrarySlice";
import storage from "redux-persist/lib/storage";
import cartReducer from "../features/cart/cartSlice";
import genresSlice from "../features/genres/genresSlice";
import suggestionsSlice from "../features/suggestions/suggestionsSlice";

// redux-persist is used to persist the redux store in the browser's local storage, so in the single page application, the redux store will not be lost when the page is refreshed. e.g., in this app, after login, if click the close login form button, and switch to home page, the login status, token will be kept in the local storage
import { persistStore, persistReducer } from "redux-persist";

// the persistConfig is used to configure the redux-persist, the key is the key of the local storage, and the storage is the local storage itself
// const persistConfig = {
//   key: "root",
//   storage,
// };

const persistConfigLogin = {
  key: "login",
  storage,
};

const persistConfigCart = {
  key: "cart",
  storage,
};

// the persistedReducer is the reducer with the persistConfig, so the redux-persist will be applied to this reducer, there are two arguments, the first one is the persistConfig, the second one is the reducer from the loginSlice, which we want to apply the redux-persist to
// const persistedReducer = persistReducer(persistConfig, loginReducer);

// add cartReducer and loginReducer to persistedReducer
const persistedReducerLogin = persistReducer(persistConfigLogin, loginReducer);

const persistedReducerCart = persistReducer(persistConfigCart, cartReducer);

// const rootReducer = combineReducers({
//   login: persistedReducerLogin,
//   cart: persistedReducerCart,
// });

// export default rootReducer;

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    notifications: notificationsReducer,
    gameLibrary: gameLibraryReducer,
    // in the login reducer, we use the persistedReducer, which is the login reducer with the redux-persist applied
    login: persistedReducerLogin,
    cart: persistedReducerCart,
    users: usersReducer,
    genres: genresSlice,
    suggestions: suggestionsSlice,
  },

  //In this case, the non-serializable warning is occurring because of the redux-persist library, which uses non-serializable values (functions) in its actions. This is an exception to Redux's rule and usually wouldn't cause any issues in the application. to avoid this warning by updating the serializableCheck middleware option provided by @reduxjs/toolkit. we can provide a list of actions to ignore through ignoredActions.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          // just ignore every redux-persist action
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// the persistor is used to persist the store, so the redux-persist will be applied to the store, there is only one argument, which is the store
export const persistor = persistStore(store);
