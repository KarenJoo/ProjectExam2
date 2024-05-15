import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false, 
    isVenueManager: false, 
    userData: null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userData = null;
        },
        setVenueManager: (state, action) => {
            state.isVenueManager = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
          },
    },
});

export const { login, logout, setVenueManager, setUserData } = authSlice.actions;
export default authSlice.reducer;