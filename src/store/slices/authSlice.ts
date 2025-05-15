import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  uid: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  uid: null,
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ uid: string; email: string }>) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
