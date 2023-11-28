const {configureStore} = require('@reduxjs/toolkit');
import UserReducer from './reducers/UserSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
